import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const buttonStyle: React.CSSProperties = {
  background: 'none',
  border: '1px solid var(--border-color)',
  borderRadius: '50%',
  cursor: 'pointer',
  padding: '0.5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'var(--text-primary)',
  fontSize: '1.2rem',
};

const ThemeToggleButton: React.FC = () => {

  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} style={buttonStyle} aria-label="Change Theme">
      {theme === 'light' ? <FaMoon /> : <FaSun />}
    </button>
  );
};

export default ThemeToggleButton;