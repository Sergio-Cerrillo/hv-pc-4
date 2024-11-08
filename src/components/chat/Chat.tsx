import React from 'react';
import InputField from '../ui/Input'; 
import SendButton from '../ui/SendButton';   
import DeleteButton from '../ui/DeleteButton';  
import useChat from '../../hooks/useChat';  
import Footer from '../ui/Footer';

const Chat: React.FC = () => {
  const { messages,message, setMessage, sendMessage, clearChat } = useChat(); 

  return (
    <>
      <section className="chat">
        <DeleteButton onClick={clearChat} />  
       
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
          <SendButton onClick={sendMessage} />  
        </form>
      </section>

        <Footer/>
    </>
  );
};

export default Chat;
