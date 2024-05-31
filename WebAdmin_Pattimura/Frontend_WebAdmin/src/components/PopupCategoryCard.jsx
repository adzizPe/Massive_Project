import React from 'react';

const PopupCategoryCard = ({ item, onClose }) => {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose}>×</button>
        {item.foto}
        <br/><h3>{item.lokasi}</h3>
        <p>{item.deskripsi}</p>
      </div>
    </div>
  );
}

export default PopupCategoryCard;


