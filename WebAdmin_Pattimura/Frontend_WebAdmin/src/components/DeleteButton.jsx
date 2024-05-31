// DeleteButton.js
import React from 'react';
import deleteIcon from '../assets/icons/delete_icon.png';

const DeleteButton = ({ onClick }) => {
  return (
    <div className="delete-button-wrapper">
      <button className="delete-button" onClick={onClick}>
        <img src={deleteIcon} alt="Delete Icon" className="delete-icon" />
      </button>
    </div>
  );
};

export default DeleteButton;
