import React from 'react';
import type { Message } from '../../types/ChatBotMessage';
import styles from './ChatBotMessageBubble.module.css';
import type { MessageBubbleProps } from '../../types/MessageBubbleProps';

const ChatBotMessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  const containerClass = isUser ? styles.user : styles.bot;

  return (
    <div className={`${styles.ChatBotMessageBubble} ${containerClass}`}>
      <div className={styles.bubble}>
        {message.text}
      </div>
    </div>
  );
};

export default ChatBotMessageBubble;