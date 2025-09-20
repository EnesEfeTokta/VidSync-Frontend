import React from 'react';
import { useParams } from 'react-router-dom';

const RoomPage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();

  return (
    <div>
      <h1>Oda Sayfası</h1>
      <p>Şu anki odanın ID'si: <strong>{roomId}</strong></p>
      <p>Burası video konferans ve SignalR bağlantısının kurulacağı yer olacak.</p>
    </div>
  );
};

export default RoomPage;