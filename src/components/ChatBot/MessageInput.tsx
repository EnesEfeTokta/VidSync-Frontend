import React, { useState } from 'react';
import styles from './MessageInput.module.css';

// Bu bileşen dışarıdan bir fonksiyon alacak: onSendMessage
// Bu fonksiyon, yeni mesaj gönderildiğinde çağrılacak.
interface MessageInputProps {
  onSendMessage: (messageText: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  // Kullanıcının girdiği metni tutmak için bir state oluşturuyoruz.
  const [inputValue, setInputValue] = useState('');

  // Mesaj gönderme işlemini yöneten fonksiyon
  const handleSend = () => {
    // Boş mesajların gönderilmesini engelliyoruz
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue(''); // Gönderdikten sonra input alanını temizliyoruz
    }
  };

  // Klavyedeki tuş basımlarını dinleyen fonksiyon
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Eğer basılan tuş "Enter" ise mesajı gönder
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        className={styles.textInput}
        placeholder="Bir mesaj yazın..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button className={styles.sendButton} onClick={handleSend}>
        Gönder
      </button>
    </div>
  );
};

export default MessageInput;