import React from 'react';
import type { Message } from '../../types/ChatBotMessage'; // 1. Adımda oluşturduğumuz tipi import ediyoruz
import styles from './ChatBotMessageBubble.module.css'; // Stil dosyamızı import ediyoruz

// Bileşenin alacağı prop'ların tipini tanımlıyoruz
interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  // Mesajın gönderenine göre doğru CSS sınıfını seçiyoruz
  const isUser = message.sender === 'user';
  const containerClass = isUser ? styles.user : styles.bot;

  return (
    <div className={`${styles.bubbleContainer} ${containerClass}`}>
      <div className={styles.bubble}>
        {message.text}
      </div>
    </div>
  );
};

export default MessageBubble;