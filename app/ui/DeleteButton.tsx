import React from 'react';


interface DeleteButtonProps {
  onClick: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => {
  return <button className="delete-button" onClick={onClick}>BORRAR CHAT</button>;
};

export default DeleteButton;
