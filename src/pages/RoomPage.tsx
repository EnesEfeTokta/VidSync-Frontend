import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { signalrService } from '../services/signalrService';
import { useAuth } from '../context/AuthContext';

const RoomPage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const { user } = useAuth();

  const [participants, setParticipants] = useState<string[]>(user ? [user.firstName] : []); 

useEffect(() => {
    if (!roomId) return;

    const setupSignalR = async () => {
      await signalrService.connect();
      signalrService.invoke('JoinRoom', roomId);

      // Başka bir kullanıcı katıldığında...
      signalrService.on('UserJoined', (joinedUserId: string) => {
        console.log(`Yeni kullanıcı katıldı: ${joinedUserId}`);
        setParticipants(prev => [...new Set([...prev, joinedUserId])]);
      });

      // Bir kullanıcı ayrıldığında...
      signalrService.on('UserLeft', (leftUserId: string) => {
        console.log(`Kullanıcı ayrıldı: ${leftUserId}`);
        setParticipants(prev => prev.filter(p => p !== leftUserId));
      });
    };

    setupSignalR();

    // Bileşen ekrandan kaldırıldığında bağlantıyı temizle
    return () => {
      signalrService.disconnect();
    };
  }, [roomId]); // Bu effect sadece bir kez (veya roomId değişirse) çalışır.

  return (
    <div>
      <h1>Oda Sayfası</h1>
      <p>Oda ID: <strong>{roomId}</strong></p>
      
      <hr />

      <h2>Katılımcılar</h2>
      {participants.length > 0 ? (
        <ul>
          {/* Listede artık kendi adınız da görünecek */}
          {participants.map(participantId => (
            <li key={participantId}>{participantId}</li>
          ))}
        </ul>
      ) : (
        <p>Katılımcılar yükleniyor...</p>
      )}
    </div>
  );
};

export default RoomPage;