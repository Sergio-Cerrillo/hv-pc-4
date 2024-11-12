import React from 'react';

interface SendButtonProps {
  onClick: () => void;
}

const SendButton: React.FC<SendButtonProps> = ({ onClick }) => {
  return <button type="button" onClick={onClick}>Enviar</button>;
};

export default SendButton;
