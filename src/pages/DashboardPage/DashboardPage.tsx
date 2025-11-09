import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { roomService } from '../../services/roomService';
import { FaPlus, FaVideo } from 'react-icons/fa';

import './DashboardPageStyles.css';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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
      alert(`Room "${newRoom.name}" created successfully!`);
      navigate(`/rooms/${newRoom.id}`);
    } catch (err) {
      console.error("Error creating room:", err);
      setError("Failed to create room. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setRoomName('');
    setExpiresDate('');
    setError(null);
  };

  return (
    <>
      <div className="dashboard-page-container">
        <header className="dashboard-header">
          <div>
            <h1>Dashboard</h1>
            <p>Welcome! This is your personal space.</p>
          </div>
          <button className="create-room-btn" onClick={() => setIsModalOpen(true)}>
            <FaPlus /> Create New Room
          </button>
        </header>

        <main className="dashboard-content">
          <h2>My Rooms</h2>
          
          <div className="no-rooms-placeholder">
              <FaVideo size={40} style={{ marginBottom: '1rem' }} />
              <p>You haven't created any rooms yet.</p>
              <p>Click "Create New Room" to get started.</p>
          </div>
        </main>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCancel}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>New Meeting Room</h3>
              <button className="close-button" onClick={handleCancel}>&times;</button>
            </div>
            <form onSubmit={handleCreateRoomSubmit} className="modal-body">
              {error && <p className="error-message">{error}</p>}
              <div className="form-group">
                <label htmlFor="roomName">Room Name</label>
                <input
                  id="roomName"
                  type="text"
                  className="form-input"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  placeholder="e.g., Project Brainstorming"
                  required
                  disabled={isCreating}
                />
              </div>
              <div className="form-group">
                <label htmlFor="expiresDate">Expiry Date (Optional)</label>
                <input
                  id="expiresDate"
                  type="date"
                  className="form-input"
                  value={expiresDate}
                  onChange={(e) => setExpiresDate(e.target.value)}
                  disabled={isCreating}
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn secondary" onClick={handleCancel} disabled={isCreating}>
                  Cancel
                </button>
                <button type="submit" className="btn primary" disabled={isCreating}>
                  {isCreating ? 'Creating...' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardPage;
