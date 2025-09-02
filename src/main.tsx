import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'; // Burayı ekleyin
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Uygulamayı BrowserRouter ile sarın */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)