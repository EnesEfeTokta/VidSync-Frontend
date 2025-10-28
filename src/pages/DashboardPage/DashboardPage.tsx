import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { roomService } from '../../services/roomService';
import { FaPlus, FaVideo } from 'react-icons/fa';

// Stil dosyalarını import ediyoruz
import './DashboardPageStyles.css';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  // 'isFormVisible' yerine 'isModalOpen' kullanarak amacını daha net hale getirelim
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [roomName, setRoomName] = useState<string>('');
  const [expiresDate, setExpiresDate] = useState<string>(''); // Bu alanı şimdilik metin olarak tutuyoruz

  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateRoomSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsCreating(true);
    setError(null);

    try {
      const newRoom = await roomService.createRoom({ name: roomName });
      alert(`"${newRoom.name}" odası başarıyla oluşturuldu!`);
      navigate(`/rooms/${newRoom.id}`);
    } catch (err) {
      console.error("Oda oluşturulurken hata:", err);
      setError("Oda oluşturulamadı. Lütfen tekrar deneyin.");
    } finally {
      setIsCreating(false);
    }
  };

  // Modal'ı kapatma ve formu sıfırlama fonksiyonu
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
            <h1>Kontrol Paneli</h1>
            <p>Hoş geldiniz! Burası sizin kişisel alanınız.</p>
          </div>
          <button className="create-room-btn" onClick={() => setIsModalOpen(true)}>
            <FaPlus /> Yeni Oda Oluştur
          </button>
        </header>

        <main className="dashboard-content">
          <h2>Mevcut Odalarım</h2>
          
          {/* 
            Backend'den odalar geldiğinde burası dinamik olacak. 
            Şimdilik statik bir "Oda yok" mesajı gösterelim.
          */}
          <div className="no-rooms-placeholder">
              <FaVideo size={40} style={{ marginBottom: '1rem' }} />
              <p>Henüz oluşturulmuş bir odanız bulunmuyor.</p>
              <p>Başlamak için "Yeni Oda Oluştur" butonuna tıklayın.</p>
          </div>

          {/* 
            // Odalarınız olduğunda bu grid yapısını kullanacaksınız:
            <div className="rooms-grid">
               // Örnek Kart
              <div className="room-card">
                <h3>Proje Lansmanı</h3>
                <p>Oluşturulma Tarihi: 24 Eki 2025</p>
                <button className="join-room-btn">Odaya Katıl</button>
              </div>
            </div> 
          */}
        </main>
      </div>

      {/* Oda Oluşturma Modalı (sadece isModalOpen true ise görünür) */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCancel}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Yeni Toplantı Odası</h3>
              <button className="close-button" onClick={handleCancel}>&times;</button>
            </div>
            <form onSubmit={handleCreateRoomSubmit} className="modal-body">
              {error && <p className="error-message">{error}</p>}
              <div className="form-group">
                <label htmlFor="roomName">Oda Adı</label>
                <input
                  id="roomName"
                  type="text"
                  className="form-input"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  placeholder="Örn: Proje Beyin Fırtınası"
                  required
                  disabled={isCreating}
                />
              </div>
              <div className="form-group">
                <label htmlFor="expiresDate">Geçerlilik Tarihi (İsteğe Bağlı)</label>
                <input
                  id="expiresDate"
                  type="date" // Tipini 'date' olarak değiştirmek daha iyi bir UX sağlar
                  className="form-input"
                  value={expiresDate}
                  onChange={(e) => setExpiresDate(e.target.value)}
                  disabled={isCreating}
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn secondary" onClick={handleCancel} disabled={isCreating}>
                  İptal
                </button>
                <button type="submit" className="btn primary" disabled={isCreating}>
                  {isCreating ? 'Oluşturuluyor...' : 'Oluştur'}
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