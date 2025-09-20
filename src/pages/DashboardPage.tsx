import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { roomService } from '../services/roomService';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [roomName, setRoomName] = useState<string>('');
  const [expiresDate, setExpiresDate] = useState<string>('');

  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateRoomSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsCreating(true);
    setError(null);

    try {
      const newRoom = await roomService.createRoom({ name: roomName });
      alert(`The room "${newRoom.name}" has been successfully created!`);
      
      // Kullanıcıyı yeni oda sayfasına götürüyor..
      navigate(`/rooms/${newRoom.id}`);

    } catch (err) {
      console.error("Error while creating room:", err);
      setError("The room could not be created. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleCancel = () => {
      setIsFormVisible(false);
      setRoomName('');
      setExpiresDate('');
      setError(null);
  }

  return (
    <div>
      <h1>Kontrol Paneli (Dashboard)</h1>
      <p>Welcome! This is your personal space.</p>
      
      <hr />

      {!isFormVisible && (
        <button onClick={() => setIsFormVisible(true)}>
          Create New Room
        </button>
      )}

      {isFormVisible && (
        <form onSubmit={handleCreateRoomSubmit}>
          <h3>New Room Name</h3>
          {/* Hata mesajını kullanıcıya göstereceğim. */}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="Enter the room name..."
            required
            disabled={isCreating}
          />
          <input
            type="text"
            value={expiresDate}
            onChange={(e) => setExpiresDate(e.target.value)}
            placeholder="Expiration date (optional)..."
            disabled={isCreating}
          />
          <button type="submit" disabled={isCreating}>
            {isCreating ? 'Creating...' : 'Create'}
          </button>
          <button type="button" onClick={handleCancel} disabled={isCreating}>
            İptal
          </button>
        </form>
      )}
    </div>
  );
};

export default DashboardPage;