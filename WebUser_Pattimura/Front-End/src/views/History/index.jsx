import './history.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import iconHolify from '../../assets/holify-icon.png';
import imgHistory from '../../assets/history.png';
import instagram from '../../assets/instagram.png';
import twitter from '../../assets/twitter.png';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import Popup from '../component/Popup'; // Import the Popup component


const History = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [filter, setFilter] = useState('Paling Baru');
  const [selectedReport, setSelectedReport] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });

    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    setUsername(null);
    navigate('/login');
  };
  const [reports, setReports] = useState([
    // ... (existing reports array)
    {
      id: 1,
      title: 'Depan Pasar Sukaramai',
      holes: 5,
      description: 'Ada banyak lubang di jalan ini yang menyebabkan kemacetan.',
      author: 'Pattimura',
      time: '10 jam yang lalu',
      status: 'Selesai',
      image: 'src/assets/history.png', // Ensure the image path is correct
      additionalInfo: 'Informasi tambahan tentang laporan ini.'
    },
    {
      id: 2,
      title: 'Depan Pasar Sukaramai',
      holes: 5,
      description: 'Lubang ini sangat dalam dan berbahaya bagi pengendara motor.',
      author: 'Pattimura',
      time: '10 jam yang lalu',
      status: 'Selesai',
      image: 'src/assets/history.png', // Ensure the image path is correct
      additionalInfo: 'Informasi tambahan tentang laporan ini.'
    },
    {
      id: 3,
      title: 'Depan Pasar Sukaramai',
      holes: 7,
      description: 'Jalan ini perlu diperbaiki segera sebelum ada kecelakaan.',
      author: 'Pattimura',
      time: '10 jam yang lalu',
      status: 'Menunggu',
      image: 'src/assets/history.png', // Ensure the image path is correct
      additionalInfo: 'Informasi tambahan tentang laporan ini.'
    },
    {
      id: 4,
      title: 'Depan Pasar Sukaramai',
      holes: 8,
      description: 'Kemacetan sering terjadi karena pengendara menghindari lubang.',
      author: 'Pattimura',
      time: '10 jam yang lalu',
      status: 'Diproses',
      image: 'src/assets/history.png', // Ensure the image path is correct
      additionalInfo: 'Informasi tambahan tentang laporan ini.'
    },
    {
      id: 5,
      title: 'Depan Pasar Sukaramai',
      holes: 4,
      description: 'Lubang ini telah ada selama beberapa bulan tanpa perbaikan.',
      author: 'Pattimura',
      time: '10 jam yang lalu',
      status: 'Paling Lama',
      image: 'src/assets/history.png', // Ensure the image path is correct
      additionalInfo: 'Informasi tambahan tentang laporan ini.'
    },
    {
      id: 6,
      title: 'Depan Pasar Sukaramai',
      holes: 5,
      description: 'Perlu segera ditangani untuk menghindari kecelakaan lebih lanjut.',
      author: 'Pattimura',
      time: '10 jam yang lalu',
      status: 'Paling Baru',
      image: 'src/assets/history.png', // Ensure the image path is correct
      additionalInfo: 'Informasi tambahan tentang laporan ini.'
    },
    {
      id: 7,
      title: 'Depan Pasar Sukaramai',
      holes: 3,
      description: 'Lubang kecil tapi cukup mengganggu lalu lintas.',
      author: 'Pattimura',
      time: '1 jam yang lalu',
      status: 'Paling Baru',
      image: 'src/assets/history.png', // Ensure the image path is correct
      additionalInfo: 'Informasi tambahan tentang laporan ini.'
    },
    // Tambahkan laporan lain di sini
  ]);
  const statusPriority = {
    'Menunggu': 1,
    'Diproses': 5,
    'Selesai': 3,
    'Paling Baru': 4,
    'Paling Lama': 2
  };
  const sortByStatusPriority = (a, b) => {
    return statusPriority[a.status] - statusPriority[b.status];
  };
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleReportClick = (report) => {
    setSelectedReport(report);
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
    setSelectedReport(null);
  };
  const filteredReports = reports.filter(report => {
    if (filter === 'Paling Baru') {
      return report.status === 'Paling Baru' || report.status === 'Menunggu' || report.status === 'Selesai' || report.status === 'Diproses';
    } else if (filter === 'Paling Lama') {
      return report.status === 'Paling Lama' || report.status === 'Selesai';
    } else if (filter === 'Menunggu') {
      return report.status === 'Menunggu';
    } else if (filter === 'Diproses') {
      return report.status === 'Diproses';
    } else if (filter === 'Selesai') {
      return report.status === 'Selesai';
    }
    return report;
  }).sort((a, b) => {
    if (filter === 'Paling Baru') {
      return b.id - a.id;
    } else if (filter === 'Paling Lama') {
      return a.id - b.id;
    }
    return sortByStatusPriority(a, b);
  });

  
  return (
    <div className='page'>
      <nav id='beranda'>
        <div className='section-navbar'>
          <img src={iconHolify} alt="icon" />
          <div className='section-list'>
            <h4 onClick={() => navigate('/')}>Beranda</h4>
            <h4 className='active'>Riwayat</h4>
            <h4 onClick={() => navigate('/?faq')}>FAQ</h4>
            <h4 onClick={() => navigate('/?aboutUs')}>Tentang Kami</h4>
          </div>
          <div className='section-btn-login'>
            {username ? (
              <>
                <button onClick={() => navigate('/profile')}>Hi, {username}</button>
                <button className='btn-logout' onClick={handleLogout}><LogoutRoundedIcon /></button>
              </>
            ) : (
              <button onClick={() => navigate('/login')}>Masuk</button>
            )}
          </div>
        </div>
      </nav>
      <main>
        <div className='section-main-history'>
          <h2>Riwayat Laporan</h2>
          <p>Laporan yang pernah dikirim oleh masyarakat</p>
        </div>
        <div className='section-list-btn'>
        <button className={filter === 'Paling Baru' ? 'active-btn' : ''} onClick={() => handleFilterChange('Paling Baru')}>Paling Baru</button>
          <button className={filter === 'Paling Lama' ? 'active-btn' : ''} onClick={() => handleFilterChange('Paling Lama')}>Paling Lama</button>
          <button className={filter === 'Menunggu' ? 'active-btn' : ''} onClick={() => handleFilterChange('Menunggu')}>Menunggu</button>
          <button className={filter === 'Diproses' ? 'active-btn' : ''} onClick={() => handleFilterChange('Diproses')}>Diproses</button>
          <button className={filter === 'Selesai' ? 'active-btn' : ''} onClick={() => handleFilterChange('Selesai')}>Selesai</button>
        </div>
        {filteredReports.map(report => (
          <div key={report.id} className='section-history' onClick={() => handleReportClick(report)}>
            <img src={imgHistory} alt="history" />
            <div className='desc'>
              <h3>{report.title}</h3>
              <div className='info'>
                <p className='info-hole'>{report.holes} Lubang</p>
                <p className={`info-status ${report.status.toLowerCase().replace(' ', '-')}`}>{report.status}</p>
              </div>
              <p className='description'>{report.description}</p>
              <div className='rapporteur'>
                <p>Oleh {report.author}</p>
                <p>{report.time}</p>
              </div>
            </div>
          </div>
        ))}
        {isPopupVisible && (
          <Popup report={selectedReport} onClose={handleClosePopup} />
        )}
       
        <footer className='history-footer'>
          <div className='section-footer'>
            <div className='section-list'>
              <p onClick={() => navigate('/')}>Beranda</p>
              <p onClick={() => window.scrollTo(0, 0)}>Riwayat</p>
              <p onClick={() => navigate('/?faq')}>FAQ</p>
              <p onClick={() => navigate('/?aboutUs')}>Tentang Kami</p>
            </div>
            <div className='cpyright'>
              <p>@2024 Holify.com - All rights reserved</p>
            </div>
            <div className='sosmed'>
              <img src={instagram} alt="instagram" />
              <img src={twitter} alt="twitter" />
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default History;