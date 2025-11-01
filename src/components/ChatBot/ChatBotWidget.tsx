import React, { useState } from 'react';
import ChatBotWindow from './ChatBotWindow';
import styles from './ChatBotWidget.module.css';

const ChatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const ChatBotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className={styles.ChatBotWidget}>
      <div className={`${styles.chatPopup} ${isOpen ? styles.open : styles.closed}`}>
        {isOpen && <ChatBotWindow />} 
      </div>
      <button className={styles.chatToggleButton} onClick={toggleChat}>
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </button>
    </div>
  );
};

export default ChatBotWidget;