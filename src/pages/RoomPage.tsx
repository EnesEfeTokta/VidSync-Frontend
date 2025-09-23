import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { signalrService } from '../services/signalrService';
import { useAuth } from '../context/AuthContext';

interface Participant {
  id: string;
  firstName: string;
}

const RoomPage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const { user } = useAuth();
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    return () => {
      signalrService.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!roomId || !user) {
      return;
    }

    const setupSignalR = async () => {
      try {
        await signalrService.connect();

        signalrService.on('UpdateParticipantList', (participantList: Participant[]) => {
          console.log("Participant list updated:", participantList);
          setParticipants(participantList);
        });

        signalrService.invoke('JoinRoom', roomId);

      } catch (error) {
        console.error("SignalR connection error:", error);
      }
    };

    setupSignalR();

  }, [roomId, user]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Room invitation link copied to clipboard!');
  };

  return (
    <div>
      <h1>Room Page</h1>
      <p>Room ID: <strong>{roomId}</strong></p>
      
      <button onClick={handleCopyLink} style={{ margin: '1rem 0' }}>
        Copy Invite Link
      </button>
      
      <hr />

      <h2>Participants ({participants.length})</h2>
      {participants.length > 0 ? (
        <ul>
          {participants.map(participant => (
            <li key={participant.id}>{participant.firstName}</li>
          ))}
        </ul>
      ) : (
        <p>You are the first one here. Share the link to invite others!</p>
      )}
    </div>
  );
};

export default RoomPage;