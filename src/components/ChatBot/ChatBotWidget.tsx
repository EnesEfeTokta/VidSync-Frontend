import React, { useState } from 'react';
import ChatWindow from './ChatBotWindow'; // Daha önce oluşturduğumuz ana pencere
import styles from './ChatBotWidget.module.css';

// Basit bir sohbet ikonu (SVG olarak)
const ChatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

// Kapatma ikonu (SVG olarak)
const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);


const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className={styles.widgetContainer}>
      {/* Açılıp kapanan sohbet penceresi */}
      <div className={`${styles.chatPopup} ${isOpen ? styles.open : styles.closed}`}>
        <ChatWindow />
      </div>

      {/* Her zaman görünen buton */}
      <button className={styles.chatToggleButton} onClick={toggleChat}>
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </button>
    </div>
  );
};

export default ChatWidget;