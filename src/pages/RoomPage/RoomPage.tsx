import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { signalrService } from '../../services/signalrService';
import { useAuth } from '../../context/AuthContext';
import { webRtcService } from '../../services/webRtcService';
import ParticipantList from '../../components/ParticipantList';
import ChatWindow from '../../components/ChatWindow';

import { 
  FaMicrophone, FaMicrophoneSlash, 
  FaVideo, FaVideoSlash, 
  FaPhoneSlash, FaUsers, FaComment 
} from 'react-icons/fa';

import './RoomPageStyles.css';

interface Participant { id: string; firstName: string; }
interface ChatMessage { id: string; content: string; sentAt: string; senderId: string; senderName: string; roomId: string; }

const RoomPage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const { user, token } = useAuth();
  
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isCallActive, setIsCallActive] = useState<boolean>(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'participants' | 'chat'>('participants');

  const peerUserIdRef = useRef<string | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  
  const handleHangUp = useCallback(() => {
    webRtcService.closeConnection();
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
    if (localVideoRef.current) localVideoRef.current.srcObject = null;
    setIsCallActive(false);
    peerUserIdRef.current = null;
    setIsAudioEnabled(true);
    setIsVideoEnabled(true);
    console.log("Call hung up and streams cleared.");
  }, []);

  const setupWebRTCConnection = useCallback(async (targetUserId: string, isInitiator: boolean) => {
    if (!targetUserId) {
      console.error("Target user ID is undefined");
      return;
    }
    console.log(`Setting up WebRTC connection to ${targetUserId}. Initiator: ${isInitiator}`);
    try {
      const localStream = await webRtcService.startLocalStream();
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStream;
        console.log("Local stream attached to video element.");
      }
      setIsCallActive(true);
      peerUserIdRef.current = targetUserId;
      setIsAudioEnabled(true);
      setIsVideoEnabled(true);

      const handleRemoteStream = (stream: MediaStream) => {
        const videoElement = remoteVideoRef.current;
        if (videoElement && videoElement.srcObject !== stream) {
          videoElement.srcObject = stream;
          console.log("Uzak akış video elementine başarıyla eklendi.");
          
          const playPromise = videoElement.play();
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              console.error("Uzak video oynatılırken hata oluştu (autoplay engellenmiş olabilir):", error);
            });
          }
        }
      };

      webRtcService.createPeerConnection(handleRemoteStream, targetUserId);
      if (isInitiator) {
        await webRtcService.createOffer(targetUserId);
      }
    } catch (error) {
      console.error("Failed to setup WebRTC", error);
      alert(`WebRTC kurulumunda hata: ${error instanceof Error ? error.message : "Bilinmeyen bir hata."}`);
      handleHangUp();
    }
  }, [handleHangUp]);
  
  useEffect(() => {
    if (!roomId || !user || !token) {
      console.log("useEffect dependencies not ready, skipping setup.", { roomId, user, token });
      return;
    }

    let isComponentMounted = true;
    console.log("RoomPage useEffect triggered: Mount");

    const onExistingParticipants = (existingUsers: Participant[]) => {
      if (!isComponentMounted) return;
      console.log("Received ExistingParticipants:", existingUsers);
      const currentUser = { id: user.id, firstName: user.firstName };
      setParticipants([currentUser, ...existingUsers.filter(p => p.id !== user.id)]);
    };
    const onUserJoined = (joinedUser: Participant) => {
      if (!isComponentMounted) return;
      console.log("Received UserJoined:", joinedUser);
      setParticipants(prev => prev.find(p => p.id === joinedUser.id) ? prev : [...prev, joinedUser]);
    };
    const onUserLeft = (leftUserId: string) => {
      if (!isComponentMounted) return;
      console.log("Received UserLeft:", leftUserId);
      setParticipants(prev => prev.filter(p => p.id !== leftUserId));
      if (peerUserIdRef.current === leftUserId) {
        alert("Görüşmedeki kişi odadan ayrıldı.");
        handleHangUp();
      }
    };
    const onReceiveMessage = (newMessage: ChatMessage) => {
      if (!isComponentMounted) return;
      console.log("Received ReceiveMessage:", newMessage);
      setMessages(prev => [...prev, newMessage]);
    };

    const fetchChatHistory = async () => {
        try {
          const apiBaseUrl = import.meta.env.VITE_API_URL;
          const response = await fetch(`${apiBaseUrl}/api/rooms/${roomId}/messages`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (!response.ok) {
             const errorText = await response.text();
             throw new Error(`Sohbet geçmişi alınamadı: ${response.status} ${errorText}`);
          }
          const history: ChatMessage[] = await response.json();
          if (isComponentMounted) setMessages(history);
        } catch (error) {
          console.error(error);
        }
    };

    const setupSignaling = async () => {
      try {
        await signalrService.connect(token);
        if (!isComponentMounted) return;
        console.log("SignalR connected successfully. Setting up listeners and joining room...");

        signalrService.on('ExistingParticipants', onExistingParticipants);
        signalrService.on('UserJoined', onUserJoined);
        signalrService.on('UserLeft', onUserLeft);
        signalrService.on('ReceiveMessage', onReceiveMessage);
        
        webRtcService.initializeSignaling(async (callerId: string) => {
          if (!isComponentMounted || peerUserIdRef.current) return;
          await setupWebRTCConnection(callerId, false);
        });

        await signalrService.invoke('JoinRoom', roomId);
        console.log(`Successfully invoked 'JoinRoom' for room: ${roomId}`);
        
      } catch (error) {
        console.error("SignalR setup or JoinRoom invocation failed:", error);
      }
    };

    const initializePage = async () => {
        await fetchChatHistory();
        if(isComponentMounted) {
            await setupSignaling();
        }
    }

    initializePage();

    return () => {
      console.log("RoomPage useEffect cleanup: Unmount");
      isComponentMounted = false;
      handleHangUp();

      signalrService.off('ExistingParticipants');
      signalrService.off('UserJoined');
      signalrService.off('UserLeft');
      signalrService.off('ReceiveMessage');
      webRtcService.cleanupSignaling();

      if (signalrService.isConnected()) {
        signalrService.invoke('LeaveRoom', roomId).catch(err => console.error("Error leaving room:", err));
      }
      signalrService.disconnect();
    };
  }, [roomId, user, token, handleHangUp, setupWebRTCConnection]);

  const handleCallUser = async (targetUserId: string) => {
    if (isCallActive) {
      alert("Zaten aktif bir arama var.");
      return;
    }
    await setupWebRTCConnection(targetUserId, true);
  };

  const handleToggleAudio = () => {
    const newAudioState = !isAudioEnabled;
    webRtcService.toggleAudio(newAudioState);
    setIsAudioEnabled(newAudioState);
  };

  const handleToggleVideo = () => {
    const newVideoState = !isVideoEnabled;
    webRtcService.toggleVideo(newVideoState);
    setIsVideoEnabled(newVideoState);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    try {
      await signalrService.invoke('SendMessage', newMessage);
      setNewMessage('');
    } catch (error) {
      console.error('Mesaj gönderilemedi:', error);
    }
  };

  return (
    <div className="room-page-layout">
      <main className="main-content-area">
        <div className="video-player-wrapper">
          <video ref={remoteVideoRef} className="remote-video" autoPlay playsInline />
          <video ref={localVideoRef} className="local-video-pip" autoPlay playsInline muted />
          {!isCallActive && (
            <div className="video-placeholder">
              <p>Görüşmeyi başlatmak için katılımcılar listesinden birini arayın.</p>
            </div>
          )}
        </div>

        {isCallActive && (
            <div className="room-controls">
                <button className="control-btn" onClick={handleToggleAudio}>
                    {isAudioEnabled ? <FaMicrophone /> : <FaMicrophoneSlash />}
                </button>
                <button className="control-btn" onClick={handleToggleVideo}>
                    {isVideoEnabled ? <FaVideo /> : <FaVideoSlash />}
                </button>
                <button className="control-btn hang-up" onClick={handleHangUp}>
                    <FaPhoneSlash />
                </button>
            </div>
        )}
      </main>

      <aside className="sidebar-area">
        <div className="sidebar-tabs">
          <button 
            className={`tab-btn ${activeTab === 'participants' ? 'active' : ''}`}
            onClick={() => setActiveTab('participants')}
          >
            <FaUsers /> Katılımcılar
          </button>
          <button 
            className={`tab-btn ${activeTab === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            <FaComment /> Sohbet
          </button>
        </div>
        <div className="sidebar-content">
          {activeTab === 'participants' ? (
            <ParticipantList
              participants={participants}
              currentUserId={user?.id}
              isCallActive={isCallActive}
              onCallUser={handleCallUser}
            />
          ) : (
            <ChatWindow
              messages={messages}
              currentUserId={user?.id}
              newMessage={newMessage}
              onNewMessageChange={setNewMessage}
              onSendMessage={handleSendMessage}
            />
          )}
        </div>
      </aside>
    </div>
  );
};

export default RoomPage;