import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

//context socket
const SocketContext = createContext<Socket | null>(null);

interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null); 
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    
    socketRef.current = io("http://localhost:3000", {
      auth: {
        serverOffset: 0,
      },
    });

    const socket = socketRef.current;

    //connection
    socket.on("connect", () => {
      console.log("Conectado al socket");
      setSocket(socket);  //update to show socket is ready
    });

    //clean on end
    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

//customhook to entry
export const useSocket = (): Socket | null => {
  return useContext(SocketContext);
};
