import React from 'react';
import { useState, useEffect } from 'react';
import { useSocket } from '../components/layout/Layout';

const useChat = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>('');
  const socket = useSocket();
  const messagesRef=React.useRef<HTMLUListElement | null>(null);
 

  useEffect(() => {
    if (!socket) {
      console.error("Socket no disponible.");
      return;
    }

    //show msg
    socket.on("chat message", (msg: string) => {
      setMessages((prevMessages) => [...prevMessages, msg]); 
    });

    //delete msg on socket
    socket.on("vaciar tabla", () => {
      setMessages([]); 
    });

    return () => {
      socket.off("chat message");
      socket.off("vaciar tabla");
    };
  }, [socket]);

  //send msg
  const sendMessage = () => {
    if (message.trim()) {
      socket!.emit("chat message", message);
      setMessage('');
    }
  };

  //delete message local and server
  const clearChat = () => {
    if (socket) {
      socket.emit("vaciar tabla");
    }
   setMessages(()=>[])
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
