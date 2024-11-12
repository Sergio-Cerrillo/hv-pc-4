"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';

//Socket context
export const SocketContext = createContext<Socket | null>(null);

//Socket hook
export const useSocket = (): Socket | null => {
  return useContext(SocketContext);
};
let socket: Socket | null = null;

//Socket connection
export const initializeSocket = (): Socket => {
  if (!socket) {
    socket = io("http://localhost:3003", { transports: ['websocket'] });

    socket.on("connect", () => {
      console.log("Conectado al socket");
    });

    socket.on("disconnect", () => {
      console.log("Desconectado del socket");
    });
  }

  return socket;
};
interface SocketProviderProps {
  children: ReactNode; 
}
export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socketInstance, setSocketInstance] = useState<Socket | null>(null);

  useEffect(() => {
    const socket = initializeSocket();
    setSocketInstance(socket);

    return () => {
      if (socket) {
        socket.disconnect();  
        console.log("Socket desconectado");
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={socketInstance}>
      {children}
    </SocketContext.Provider>
  );
};