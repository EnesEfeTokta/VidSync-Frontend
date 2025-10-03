import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { signalrService } from '../services/signalrService';
import { useAuth } from '../context/AuthContext';
import { webRtcService } from '../services/webRtcService';

interface Participant {
  id: string;
  firstName: string;
}

const RoomPage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const { user } = useAuth();

  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isCallActive, setIsCallActive] = useState<boolean>(false);
  const peerUserIdRef = useRef<string | null>(null);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const handleHangUp = useCallback(() => {
    console.log("Hanging up call...");

    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      localVideoRef.current.srcObject = null;
    }
    
    webRtcService.closeConnection();
    
    setIsCallActive(false);
    peerUserIdRef.current = null;
  }, []);

  const setupWebRTCConnection = async (targetUserId: string, isInitiator: boolean) => {
    if (!targetUserId) {
      console.error("Target user ID is undefined");
      alert("Hedef kullanıcı ID'si geçersiz!");
      return;
    }

    try {
      const localStream = await webRtcService.startLocalStream();
      
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStream;
      }
      
      setIsCallActive(true);
      peerUserIdRef.current = targetUserId;

      const handleRemoteStream = (stream: MediaStream) => {
        if (remoteVideoRef.current && remoteVideoRef.current.srcObject !== stream) {
          remoteVideoRef.current.srcObject = stream;
        }
      };

      webRtcService.createPeerConnection(handleRemoteStream, targetUserId);

      if (isInitiator) {
        await webRtcService.createOffer(targetUserId);
      }
    } catch (error) {
      console.error("Failed to setup WebRTC", error);
      alert(`Bir hata oluştu: ${error instanceof Error ? error.message : "Bilinmeyen bir hata."}`);
      handleHangUp();
    }
  };

  useEffect(() => {
    if (!roomId || !user) return;

    let isMounted = true;

    const setupSignaling = async () => {
      try {
        await signalrService.connect();
        if (!isMounted) return;

        signalrService.on('ExistingParticipants', (existingUsers: Participant[]) => {
          if (!isMounted) return;
          const currentUser = { id: user.id, firstName: user.firstName };
          const otherUsers = existingUsers.filter(p => p.id !== user.id);
          setParticipants([currentUser, ...otherUsers]);
        });

        signalrService.on('UserJoined', (joinedUser: Participant) => {
          if (!isMounted) return;
          setParticipants(prev => {
            if (prev.find(p => p.id === joinedUser.id)) return prev;
            return [...prev, joinedUser];
          });
        });

        signalrService.on('UserLeft', (leftUserId: string) => {
          if (!isMounted) return;
          setParticipants(prev => prev.filter(p => p.id !== leftUserId));
          
          if (peerUserIdRef.current === leftUserId) {
            alert("Görüşmedeki kişi odadan ayrıldı.");
            handleHangUp();
          }
        });

        webRtcService.initializeSignaling(async (callerId: string) => {
          if (!isMounted || peerUserIdRef.current) {
            console.warn("Already in a call or component is unmounted, ignoring incoming offer from", callerId);
            return;
          }
          await setupWebRTCConnection(callerId, false);
        });

        await signalrService.invoke('JoinRoom', roomId);

      } catch (error) {
        if (isMounted) {
          console.error("SignalR setup failed:", error);
        }
      }
    };

    setupSignaling();

    return () => {
      isMounted = false;
      handleHangUp();
      signalrService.invoke('LeaveRoom', roomId).catch(err => console.error("Error leaving room:", err));
      signalrService.disconnect();
    };
  }, [roomId, user, handleHangUp]);

  const handleCallUser = async (targetUserId: string) => {
    if (isCallActive) {
      alert("Zaten aktif bir arama var!");
      return;
    }
    await setupWebRTCConnection(targetUserId, true);
  };

  return (
    <div>
      <h1>Oda: {roomId}</h1>
      <div>
        <h2>Katılımcılar</h2>
        <ul>
          {participants.map(participant => (
            <li key={participant.id}>
              {participant.firstName} {participant.id === user?.id && "(Siz)"}
              {participant.id !== user?.id && (
                <button
                  onClick={() => handleCallUser(participant.id)}
                  disabled={isCallActive}
                >
                  Ara
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Videolar</h2>
        <div style={{ display: 'flex', gap: '20px' }}>
          <div>
            <h3>Yerel Video</h3>
            <video ref={localVideoRef} autoPlay muted playsInline style={{ width: '300px', border: '1px solid black' }} />
          </div>
          <div>
            <h3>Uzak Video</h3>
            <video ref={remoteVideoRef} autoPlay playsInline style={{ width: '300px', border: '1px solid black' }} />
          </div>
        </div>
        {isCallActive && (
          <button onClick={handleHangUp} style={{ marginTop: '10px' }}>Aramayı Sonlandır</button>
        )}
      </div>
    </div>
  );
};

export default RoomPage;