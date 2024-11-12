import React, { useState, useEffect, useRef } from 'react';
import { useSocket } from '../src/socket'; 

const useChat = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>('');
  const socket = useSocket(); 
  //connect one time
  const isSocketInitializedRef = useRef(false);

  //when socket's connect
  useEffect(() => {
    
    if (!socket)return;

    if (!isSocketInitializedRef.current) {
      
      socket.on("chat message", (msg: string) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
      });

      socket.on("vaciar tabla", () => {
        setMessages([]);
      });

      socket.on("initial messages", (initialMessages: string[]) => {
        setMessages(initialMessages);
      });

      
      isSocketInitializedRef.current = true;
      console.log("Eventos del socket configurados correctamente.");
    }

    //clean at the end
    return () => {
      if (socket) {
        socket.off("chat message");
        socket.off("vaciar tabla");
        socket.off("initial messages");
      }
    };
  }, [socket]);

  //send message
  const sendMessage = () => {
    if (message.trim() && socket) {
      socket.emit("chat message", message);
      setMessage('');
    } else {
      console.warn("No se puede enviar el mensaje. Socket no disponible o mensaje vacío.");
    }
  };

  //clean chat
  const clearChat = () => {
    if (socket) {
      socket.emit("vaciar tabla");
      setMessages([]); 
    } else {
      console.warn("Socket no disponible para limpiar el chat.");
    }
  };

  return {
    messages,
    message,
    setMessage,
    sendMessage,
    clearChat,
  };
};

export default useChat;
