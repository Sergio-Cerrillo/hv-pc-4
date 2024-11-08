import Chat from './components/chat/Chat'
import React from 'react';
import { SocketProvider } from './components/layout/Layout';

  const App: React.FC = () => {
  return (
    <SocketProvider>
      <Chat/>
    </SocketProvider>
  );
};
export default App;

