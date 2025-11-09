import React, { useState, useRef, useEffect } from 'react';
import styles from './ChatBotMessageInput.module.css';
import type { MessageInputProps } from '../../types/MessageInputProps';

const ChatBotMessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; 
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; 
    }
  }, [inputValue]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={styles.ChatBotMessageInput}>
      <textarea
        ref={textareaRef}
        className={styles.textAreaInput} 
        placeholder="Write a message..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyPress} 
        rows={1} 
      />
      <button className={styles.sendButton} onClick={handleSend}>
        Gönder
      </button>
    </div>
  );
};

export default ChatBotMessageInput;