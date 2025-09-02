import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState("Yükleniyor...");

  useEffect(() => {
    fetch('/api/Auth/register')
      .then(response => response.json())
      .then(data => {
        console.log("Veri başarıyla alındı:", data);
        setMessage(data.message || "Başarılı bir cevap alındı ama mesaj yok.");
      })
      .catch(error => {
        console.error("API isteği sırasında hata oluştu:", error);
        setMessage("API'ye bağlanırken bir hata oluştu.");
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>VidSync Frontend</h1>
        <p>Backend'den gelen mesaj: {message}</p>
      </header>
    </div>
  );
}

export default App;