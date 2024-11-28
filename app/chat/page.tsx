"use client"
import React from 'react';
import InputField from '../ui/Input';
import useChat from '../hooks/useChat';
import Footer from '../ui/Footer';
import Button from '../ui/Button';

const Chat: React.FC = () => {
  const { messages, message, setMessage, sendMessage, clearChat } = useChat();

  return (
    <>
      <section className="chat">
        <Button className="delete-button" onClick={clearChat}><span>Borrar Chat</span></Button>

        <ul className="messages">
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>

        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <InputField
            placeholder="Escribe tu m£ensaje"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button className="button" onClick={sendMessage}><span>Enviar</span></Button>
        </form>
      </section>

      <Footer />
    </>
  );
};

export default Chat;
