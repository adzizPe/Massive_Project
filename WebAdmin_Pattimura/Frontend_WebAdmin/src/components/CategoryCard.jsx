import React, { useState } from 'react';
import PopupCategoryCard from './PopupCategoryCard';
import { KategoriBeratData } from './KategoriBeratData';
import { KategoriSedangData } from './KategoriSedangData';

const MAX_WORDS = 20;

const truncateDescription = (description) => {
  const words = description.split(' ');
  if (words.length > MAX_WORDS) {
    return words.slice(0, MAX_WORDS).join(' ') + '...';
  }
  return description;
};

const CategoryCard = ({ kategori }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleCardClick = (item) => {
    setSelectedItem(item);
  };

  const closePopup = () => {
    setSelectedItem(null);
  };

  // Tentukan data berdasarkan kategori
  const categoryData = kategori === 'Parah' ? KategoriBeratData : KategoriSedangData;

  return (
    <div className='card-container' style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto' }}>
      {categoryData.map((item, index) => {
        const truncatedDescription = truncateDescription(item.deskripsi);

        return (
          <div key={index} className={`card ${item.cName}`} onClick={() => handleCardClick(item)} style={{ marginRight: '10px' }}>
            {item.foto}
            <br /><b>{item.lokasi}</b>
            <p>{truncatedDescription}</p>
            <div className='card-sender'>
              {item.fotoprofil}
              <div className='card-sender-1'>
                <b>{item.nama}</b>
                <br />{item.tanggal}
              </div>
            </div>
          </div>
        );
      })}
      {selectedItem && <PopupCategoryCard item={selectedItem} onClose={closePopup} />}
    </div>
  );
};

export default CategoryCard;
