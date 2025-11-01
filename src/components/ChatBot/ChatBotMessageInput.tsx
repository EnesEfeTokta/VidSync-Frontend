import React, { useState, useRef, useEffect } from 'react';
import styles from './ChatBotMessageInput.module.css';

interface MessageInputProps {
  onSendMessage: (messageText: string) => void;
}

const ChatBotMessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  // Metin alanının yüksekliğini içeriğe göre ayarlar
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Yüksekliği sıfırla
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // İçerik yüksekliğine ayarla
    }
  }, [inputValue]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Shift tuşuna basılı değilken Enter'a basılırsa gönder
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Enter'ın varsayılan "yeni satır" eylemini engelle
      handleSend();
    }
  };

  return (
    <div className={styles.ChatBotMessageInput}>
      <textarea
        ref={textareaRef}
        className={styles.textAreaInput} // Sınıf adı değişti
        placeholder="Bir mesaj yazın..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyPress} // onKeyPress yerine onKeyDown kullanmak daha güvenilir
        rows={1} // Başlangıçta tek satır
      />
      <button className={styles.sendButton} onClick={handleSend}>
        Gönder
      </button>
    </div>
  );
};

export default ChatBotMessageInput;