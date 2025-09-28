import React, { useEffect, useState, useRef } from 'react';
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

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const setupWebRTC = async (isInitiator: boolean, targetUserId?: string) => {
    try {
      const localStream = await webRtcService.startLocalStream();
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStream;
      }
      setIsCallActive(true);

      webRtcService.createPeerConnection((remoteStream) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream;
        }
      });

      if (isInitiator && targetUserId) {
        await webRtcService.createOffer(targetUserId);
      }
    } catch (error) {
      console.error("Failed to setup WebRTC", error);
    }
  };

  useEffect(() => {
    if (!roomId || !user) return;
    
    const setupSignaling = async () => {
      try {
        await signalrService.connect();
        
        signalrService.on('ExistingParticipants', (existingUsers: Participant[]) => {
          setParticipants([user, ...existingUsers]);
        });
        
        signalrService.on('UserJoined', (joinedUser: Participant) => {
          setParticipants(prev => [...prev.filter(p => p.id !== joinedUser.id), joinedUser]);
        });
        
        signalrService.on('UserLeft', (leftUserId: string) => {
          setParticipants(prev => prev.filter(p => p.id !== leftUserId));
          webRtcService.closeConnection();
          setIsCallActive(false);
          if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
        });

        webRtcService.initializeSignaling(() => {
          setupWebRTC(false);
        });

        signalrService.invoke('JoinRoom', roomId);

      } catch (error) {
        console.error("SignalR setup failed:", error);
      }
    };
    
    setupSignaling();

    return () => {
      webRtcService.closeConnection();
      signalrService.disconnect();
    };
  }, [roomId, user]);

  const handleCallUser = (targetUserId: string) => {
    if (targetUserId === user?.id || isCallActive) return;
    setupWebRTC(true, targetUserId);
  };

  const handleHangUp = () => {
    webRtcService.closeConnection();
    setIsCallActive(false);
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
    if (localVideoRef.current) localVideoRef.current.srcObject = null;
  };

  return (
    <div>
      <h1>Room: {roomId}</h1>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <div>
          <h2>Videos</h2>
          <div>
            <h3>My Camera</h3>
            <video ref={localVideoRef} autoPlay playsInline muted style={{ width: '320px', backgroundColor: 'black' }} />
          </div>
          <div>
            <h3>Remote User</h3>
            <video ref={remoteVideoRef} autoPlay playsInline style={{ width: '320px', backgroundColor: 'black' }} />
          </div>
          {isCallActive && <button onClick={handleHangUp}>Hang Up</button>}
        </div>
        <div>
          <h2>Participants ({participants.length})</h2>
          <ul>
            {participants.map((p) => (
              <li key={p.id}>
                {p.firstName} {p.id === user?.id ? '(You)' : ''}
                {p.id !== user?.id && !isCallActive && (
                  <button onClick={() => handleCallUser(p.id)} style={{ marginLeft: '1rem' }}>
                    Call
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RoomPage;