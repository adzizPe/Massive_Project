// src/component/Popup.jsx
import React from 'react';
import './Popup.scss';

const Popup = ({ report, onClose }) => {
  if (!report) return null;

  return (
    <div className="popup">
      <div className="popup-content">
        <span className="close-btn" onClick={onClose}>&times;</span>
        <img className="report-image" src={report.image} alt={report.title} />
        <div className="desc">
          <h3>{report.title}</h3>
          <p>{report.description}</p>
          <div className="status-buttons">
            <button className="status-button selesai">Selesai</button>
            <button className="status-button proses">Proses</button>
          </div>
          <p className="additional-info">{report.additionalInfo}</p>
        </div>
      </div>
    </div>
  );
};

export default Popup;
