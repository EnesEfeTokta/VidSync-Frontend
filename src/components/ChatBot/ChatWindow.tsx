import React, { useState, useEffect, useRef } from 'react';
import type { Message } from './types';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import styles from './ChatWindow.module.css';

// YENİ: Başlangıç mesajını bir değişkene alalım, tekrar kullanacağız.
const initialMessage: Message[] = [
  { id: 1, text: 'Merhaba! Size nasıl yardımcı olabilirim?', sender: 'bot' }
];

const ChatWindow: React.FC = () => {

  // DEĞİŞTİ: useState'in başlangıç değeri artık localStorage'dan geliyor.
  // Bu "lazy initial state" yöntemidir. Bu fonksiyon sadece ilk render'da çalışır.
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const savedMessages = localStorage.getItem('chat_messages');
      // Eğer kayıtlı mesaj varsa, onu parse edip döndür.
      return savedMessages ? JSON.parse(savedMessages) : initialMessage;
    } catch (error) {
      console.error("Mesajlar yüklenirken hata oluştu:", error);
      // Hata durumunda varsayılan mesajı döndür.
      return initialMessage;
    }
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // DEĞİŞTİ: Bu useEffect artık iki iş yapıyor:
  // 1. Yeni mesaj geldiğinde en alta kaydırıyor.
  // 2. Mesaj listesinin son halini localStorage'a kaydediyor.
  useEffect(() => {
    scrollToBottom();
    // messages state'i her değiştiğinde, güncel halini string'e çevirip kaydet.
    localStorage.setItem('chat_messages', JSON.stringify(messages));
  }, [messages]);

  const handleSendMessage = (text: string) => {
    const newUserMessage: Message = {
      id: Date.now(),
      text: text,
      sender: 'user',
    };
    
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: `Mesajınızı aldım: "${text}"`,
        sender: 'bot',
      };
      setMessages(prevMessages => [...prevMessages, botResponse]);
    }, 1000);
  };

  // YENİ: Sohbeti temizleme fonksiyonu
  const handleClearChat = () => {
    // Önce localStorage'daki kaydı temizle
    localStorage.removeItem('chat_messages');
    // Sonra state'i başlangıç durumuna geri getir
    setMessages(initialMessage);
  };

  return (
    <div className={styles.chatWindow}>
      {/* YENİ: Başlık ve Temizle Butonunun olduğu header */}
      <div className={styles.chatHeader}>
        <h3>Yardımcı Bot</h3>
        <button onClick={handleClearChat} className={styles.clearButton}>
          Sohbeti Temizle
        </button>
      </div>

      <div className={styles.messagesContainer}>
        {messages.map(message => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;