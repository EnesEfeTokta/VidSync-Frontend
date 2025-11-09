import React, { useState, useEffect, useRef } from 'react';
import type { Message } from '../../types/ChatBotMessage';
import ChatBotMessageBubble from './ChatBotMessageBubble';
import ChatBotMessageInput from './ChatBotMessageInput';
import styles from './ChatBotWindow.module.css';

const initialMessage: Message[] = [
  { id: 1, text: 'Hello! How can I help you?', sender: 'bot' }
];

const ChatBotWindow: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const savedMessages = localStorage.getItem('chat_bot_messages');
      return savedMessages ? JSON.parse(savedMessages) : initialMessage;
    } catch (error) {
      console.error("An error occurred while loading bot messages:", error);
      return initialMessage;
    }
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    localStorage.setItem('chat_bot_messages', JSON.stringify(messages));
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
        text: `I received your message: "${text}"`,
        sender: 'bot',
      };
      setMessages(prevMessages => [...prevMessages, botResponse]);
    }, 1000);
  };

  return (
    <div className={styles.ChatBotWindow}>
      <div className={styles.chatHeader}>
        Yardımcı Bot
      </div>
      <div className={styles.messagesContainer}>
        {messages.map(message => (
          <ChatBotMessageBubble key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <ChatBotMessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatBotWindow;