import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { signalrService } from '../../services/signalrService';
import { useAuth } from '../../context/AuthContext';
import { webRtcService } from '../../services/webRtcService';
import { roomService } from '../../services/roomService';
import ParticipantList from '../../components/ParticipantList';
import ChatWindow from '../../components/ChatWindow';

import { 
  FaMicrophone, FaMicrophoneSlash, 
  FaVideo, FaVideoSlash, 
  FaPhoneSlash, FaUsers, FaComment,
  FaChevronRight, FaChevronLeft,
  FaFileAlt
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

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'participants' | 'chat'>('participants');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSummarizing, setIsSummarizing] = useState(false);

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
  }, []);

  const setupWebRTCConnection = useCallback(async (targetUserId: string, isInitiator: boolean) => {
    if (!targetUserId) {
      console.error("Hedef kullanıcı ID'si tanımsız.");
      return;
    }
    try {
      const localStream = await webRtcService.startLocalStream();
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStream;
      }
      setIsCallActive(true);
      peerUserIdRef.current = targetUserId;
      setIsAudioEnabled(true);
      setIsVideoEnabled(true);

      const handleRemoteStream = (stream: MediaStream) => {
        if (!stream || !stream.active || stream.getTracks().length === 0) {
            return;
        }
        const videoElement = remoteVideoRef.current;
        if (videoElement && videoElement.srcObject !== stream) {
          videoElement.srcObject = stream;
          videoElement.play().catch(err => console.error("Uzak video oynatılamadı:", err));
        }
      };

      webRtcService.createPeerConnection(handleRemoteStream, targetUserId);
      if (isInitiator) {
        await webRtcService.createOffer(targetUserId);
      }
    } catch (err) {
      console.error("WebRTC kurulumu başarısız oldu", err);
      handleHangUp();
    }
  }, [handleHangUp]);
  
  useEffect(() => {
    if (!roomId || !user || !token) return;
    let isComponentMounted = true;

    const onExistingParticipants = (existingUsers: Participant[]) => {
      if (isComponentMounted) setParticipants([{ id: user.id, firstName: user.firstName }, ...existingUsers.filter(p => p.id !== user.id)]);
    };
    const onUserJoined = (joinedUser: Participant) => {
      if (isComponentMounted) setParticipants(prev => prev.find(p => p.id === joinedUser.id) ? prev : [...prev, joinedUser]);
    };
    const onUserLeft = (leftUserId: string) => {
      if (isComponentMounted) {
        setParticipants(prev => prev.filter(p => p.id !== leftUserId));
        if (peerUserIdRef.current === leftUserId) {
          alert("Görüşmedeki kişi odadan ayrıldı.");
          handleHangUp();
        }
      }
    };
    const onReceiveMessage = (newMessage: ChatMessage) => {
      if (isComponentMounted) setMessages(prev => [...prev, newMessage]);
    };

    const initializePage = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const apiBaseUrl = import.meta.env.VITE_API_URL;
            const response = await fetch(`${apiBaseUrl}/api/rooms/${roomId}/messages`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Sohbet geçmişi alınamadı.');
            const history: ChatMessage[] = await response.json();
            if (isComponentMounted) setMessages(history);

            await signalrService.connect(token);
            if (!isComponentMounted) return;

            signalrService.on('existingParticipants', onExistingParticipants);
            signalrService.on('userJoined', onUserJoined);
            signalrService.on('userLeft', onUserLeft);
            signalrService.on('receiveMessage', onReceiveMessage);
            
            webRtcService.initializeSignaling(async (callerId: string) => {
                if (isComponentMounted && !peerUserIdRef.current) {
                  await setupWebRTCConnection(callerId, false);
                }
            });

            await signalrService.invoke('joinRoom', roomId);

        } catch (err) {
            if(isComponentMounted) setError(err instanceof Error ? err.message : 'Odaya bağlanırken bir hata oluştu.');
        } finally {
            if(isComponentMounted) setIsLoading(false);
        }
    }

    initializePage();

    return () => {
      isComponentMounted = false;
      handleHangUp();
      signalrService.off('existingParticipants');
      signalrService.off('userJoined');
      signalrService.off('userLeft');
      signalrService.off('receiveMessage');
      webRtcService.cleanupSignaling();
      if (signalrService.isConnected()) {
        signalrService.invoke('leaveRoom', roomId).catch(err => console.error("Odadan ayrılırken hata:", err));
      }
      signalrService.disconnect();
    };
  }, [roomId, user, token, handleHangUp, setupWebRTCConnection]);

  const handleCallUser = async (targetUserId: string) => {
    if (isCallActive) return;
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
      await signalrService.invoke('sendMessage', newMessage);
      setNewMessage('');
    } catch (error) {
      console.error('Mesaj gönderilemedi:', error);
    }
  };

  const handleSendSummary = async () => {
    if (isSummarizing || !roomId || !token) return;
    setIsSummarizing(true);
    try {
      await roomService.sendMeetingSummary(roomId, token);
      alert("Toplantı özeti başarıyla e-posta adresinize gönderiliyor.");
    } catch (error) {
      console.error("Özet gönderme hatası:", error);
      alert(error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu.');
    } finally {
      setIsSummarizing(false);
    }
  };

  if (isLoading) {
    return <div className="loading-overlay"><h1>Oda Yükleniyor...</h1></div>;
  }

  if (error) {
    return <div className="error-overlay"><h1>Hata</h1><p>{error}</p></div>;
  }

  return (
    <div className={`room-page-layout ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <main className="main-content-area">
        <div className="video-player-wrapper">
          <video ref={remoteVideoRef} className="remote-video" autoPlay playsInline />
          <video ref={localVideoRef} className="local-video-pip" autoPlay playsInline muted />
          {!isCallActive && (
            <div className="video-placeholder">
              <h2>Görüşmeye Hoş Geldiniz!</h2>
              <p>Başlamak için sağdaki listeden bir katılımcıyı arayın.</p>
            </div>
          )}
        </div>

        {isCallActive && (
            <div className="room-controls">
                <button className="control-btn" onClick={handleToggleAudio} title={isAudioEnabled ? "Mikrofonu Kapat" : "Mikrofonu Aç"}>
                    {isAudioEnabled ? <FaMicrophone /> : <FaMicrophoneSlash />}
                    <span>{isAudioEnabled ? "Sessize Al" : "Sesi Aç"}</span>
                </button>
                <button className="control-btn" onClick={handleToggleVideo} title={isVideoEnabled ? "Kamerayı Kapat" : "Kamerayı Aç"}>
                    {isVideoEnabled ? <FaVideo /> : <FaVideoSlash />}
                    <span>{isVideoEnabled ? "Durdur" : "Başlat"}</span>
                </button>
                <button
                  className="control-btn"
                  onClick={handleSendSummary}
                  disabled={isSummarizing}
                  title="Toplantı özetini e-postana gönder"
                >
                  <FaFileAlt />
                  <span>{isSummarizing ? "Gönderiliyor..." : "Özet Gönder"}</span>
                </button>
                <button className="control-btn hang-up" onClick={handleHangUp} title="Görüşmeyi Sonlandır">
                    <FaPhoneSlash />
                </button>
            </div>
        )}
      </main>

      <aside className="sidebar-area">
        <div className="sidebar-header">
           <h3 className="sidebar-title">{activeTab === 'participants' ? 'Katılımcılar' : 'Sohbet'}</h3>
        </div>
        <div className="sidebar-tabs">
          <button 
            className={`tab-btn ${activeTab === 'participants' ? 'active' : ''}`}
            onClick={() => setActiveTab('participants')}
            title="Katılımcı listesini göster"
          >
            <FaUsers /> <span>Katılımcılar</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveTab('chat')}
            title="Sohbet penceresini göster"
          >
            <FaComment /> <span>Sohbet</span>
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
      
      <button 
        className="sidebar-toggle-btn" 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        title={isSidebarOpen ? "Paneli Gizle" : "Paneli Göster"}
      >
        {isSidebarOpen ? <FaChevronRight /> : <FaChevronLeft />}
      </button>
    </div>
  );
};

export default RoomPage;