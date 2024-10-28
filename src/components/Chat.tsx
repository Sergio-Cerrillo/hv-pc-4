import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';


export const Chat: React.FC = () => {
const socket = io('http://localhost:3000', {
  auth: {
    serverOffset: 0,
  },
});


  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    // Escuchar los mensajes del servidor
    socket.on('chat message', (msg: string) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
      scrollToBottom();
    });

    return () => {
      socket.off('chat message');
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      socket.emit('chat message', input);
      setInput('');
    } else {
      console.log("No se puede enviar un mensaje vacío.");
    }
  };

  const handleDelete = () => {
    socket.emit('vaciar tabla');
    setMessages([]); // Limpiar mensajes localmente
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  };

  return (
    <div>
      <section className="chat">
        <button className="delete-button" onClick={handleDelete}>
          BORRAR CHAT
        </button>
        <ul ref={messagesEndRef} className="messages" style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="input"
            placeholder="Escribe aquí..."
            autoComplete="off"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">Enviar</button>
        </form>
      </section>
      <footer className="footer">
        <p>Desarrollado por <strong>Sergio Cerrillo</strong> © 2024</p>
      </footer>
    </div>
  );
};

export default Chat;
