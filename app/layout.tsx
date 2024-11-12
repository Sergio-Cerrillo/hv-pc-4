"use client"
import React, { ReactNode, useEffect, useState } from 'react';
import { initializeSocket } from './src/socket'; 
import { Socket } from 'socket.io-client';
import { SocketContext } from './src/socket'; 
import '../public/global.css';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = initializeSocket();
    setSocket(socketInstance);

    
    return () => {
      socketInstance.disconnect();
    };
  }, []); 

  return (
    <html lang="es">
      <body>
        <SocketContext.Provider value={socket}>
          {children}
        </SocketContext.Provider>
      </body>
    </html>
  );
}
