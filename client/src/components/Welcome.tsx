import React from 'react';
import { ReactDOM } from 'react';
import { useNavigate } from 'react-router-dom';
import './welcome.css'; 

export const Welcome: React.FC = () => {
  const navigate = useNavigate();

  const handleEnterChat = () => {
    navigate('/chat'); 
  };

  return (
    <div className="welcome-screen">
      <h1>Bienvenido/a</h1>
      <p>HV-PC-2</p>
      <button className="enter-chat" onClick={handleEnterChat}>
        Entrar al Chat
      </button>
      <footer className="footer">
        <p>Desarrollado por <strong>Sergio Cerrillo</strong> © 2024</p>
      </footer>
    </div>
  );
};

