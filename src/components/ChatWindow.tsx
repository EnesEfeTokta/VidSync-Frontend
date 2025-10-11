import React, { useRef, useEffect } from 'react';

interface ChatMessage {
  id: string;
  content: string;
  sentAt: string;
  senderId: string;
  senderName: string;
  roomId: string;
}

interface ChatWindowProps {
  messages: ChatMessage[];
  currentUserId?: string;
  newMessage: string;
  onNewMessageChange: (message: string) => void;
  onSendMessage: (e: React.FormEvent) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  currentUserId,
  newMessage,
  onNewMessageChange,
  onSendMessage,
}) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-container">
      <h2>Sohbet</h2>
      <div className="message-list" ref={chatContainerRef}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${msg.senderId === currentUserId ? 'my-message' : 'other-message'}`}
          >
            <div className="message-sender">{msg.senderName}</div>
            <div className="message-content">{msg.content}</div>
            <div className="message-timestamp">
              {new Date(msg.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}
      </div>
      <form className="chat-input-form" onSubmit={onSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => onNewMessageChange(e.target.value)}
          placeholder="Mesajınızı yazın..."
        />
        <button type="submit">Gönder</button>
      </form>
    </div>
  );
};

export default ChatWindow;