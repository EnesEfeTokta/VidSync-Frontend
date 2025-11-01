import React, { useEffect, useRef } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import './ChatWindow.css';

interface ChatMessage {
  id: string;
  content: string;
  sentAt: string;
  senderId: string;
  senderName: string;
}

interface ChatWindowProps {
  messages: ChatMessage[];
  currentUserId: string | undefined;
  newMessage: string;
  onNewMessageChange: (value: string) => void;
  onSendMessage: (e: React.FormEvent) => Promise<void>;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  currentUserId,
  newMessage,
  onNewMessageChange,
  onSendMessage,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const formatTime = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    } catch {
      return '';
    }
  }

  return (
    <div className="chat-window-container">
      <div className="messages-list">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message-item ${msg.senderId === currentUserId ? 'my-message' : 'other-message'}`}
          >
            <div className="message-bubble">
              {msg.senderId !== currentUserId && (
                <div className="message-sender">{msg.senderName}</div>
              )}
              <div className="message-content-wrapper">
                <span className="message-content">{msg.content}</span>
                <span className="message-timestamp">{formatTime(msg.sentAt)}</span>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form className="message-input-form" onSubmit={onSendMessage}>
        <input
          type="text"
          placeholder="Mesajınızı yazın..."
          value={newMessage}
          onChange={(e) => onNewMessageChange(e.target.value)}
          autoComplete="off"
        />
        <button type="submit" disabled={!newMessage.trim()} title="Gönder">
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;