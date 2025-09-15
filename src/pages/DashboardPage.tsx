import React, { useState } from 'react';

const DashboardPage: React.FC = () => {
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  const [roomName, setRoomName] = useState<string>('');
  const [expiresDate, setExpiresDate] = useState<string>('');

  const handleCreateRoomSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(`Creating new room: "${roomName}"`);
    console.log(`Room expiration date: "${expiresDate}"`);

    setIsFormVisible(false);
    setRoomName('');
    setExpiresDate('');
  };

  return (
    <div>
      <h1>Control Panel (Dashboard)</h1>
      <p>Welcome! This is your personal space.</p>
      
      <hr />

      {/* Eğer form görünür değilse, "Yeni Oda Oluştur" butonunu göster */}
      {!isFormVisible && (
        <button onClick={() => setIsFormVisible(true)}>
          Create New Room
        </button>
      )}

      {/* 
        Eğer isFormVisible true ise, oda oluşturma formunu göster.
      */}
      {isFormVisible && (
        <form onSubmit={handleCreateRoomSubmit}>
          <h3>New Room Name</h3>
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="Enter room name..."
            required
          />
          <input
            type="text"
            value={expiresDate}
            onChange={(e) => setExpiresDate(e.target.value)}
            placeholder="Enter expiration date..."
          />
          <button type="submit">Create</button>
          {/* It's a good practice to add a cancel button to close the form */}
          <button type="button" onClick={() => setIsFormVisible(false)}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default DashboardPage;