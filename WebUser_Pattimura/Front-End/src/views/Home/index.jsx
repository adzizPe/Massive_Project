import './home.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import iconHolify from '../../assets/holify-icon.png';
import ImageCar from '../../assets/car.png';
import ImageMdn from '../../assets/medan.png';
import ImagePupr from '../../assets/pupr.png';
import ImageAct from '../../assets/activity.png';
import ImagePlatform from '../../assets/platform.png';
import ImageInfo from '../../assets/info.png';
import ImageReport from '../../assets/report.png';
import ImageDatabase from '../../assets/database.png';
import ImageHolify from '../../assets/holify-text.png';
import instagram from '../../assets/instagram.png';
import twitter from '../../assets/twitter.png';
import ImgAdd from '../../assets/add.png';
import ImgClose from '../../assets/close.png';
import ImgSelect from '../../assets/select.png';
import ImgUpload from '../../assets/upload.png';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import axios from 'axios';


const Modal = ({ closeModal }) => {
  const [files, setFiles] = useState([]);
  const [alert, setAlert] = useState(false);
  const [formData, setFormData] = useState({
    location: '',
    numberOfPotholes: '',
    additionalDetails: '',
    status: 'menunggu', // Default status
    category: 'sedang', // Default category
  });

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(droppedFiles);
  };

  const handleFileInputChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submit button clicked');

    const data = new FormData();
    data.append('location', formData.location);
    data.append('numberOfPotholes', formData.numberOfPotholes);
    data.append('additionalDetails', formData.additionalDetails);
    data.append('status', formData.status);
    data.append('category', formData.category);

    files.forEach((file, index) => {
      data.append('photos', file);
    });

    try {
      console.log('Sending data:', data);
      const response = await axios.post('http://localhost:3002/reports', data);
      console.log('Response:', response);
      setAlert(true);
    } catch (error) {
      console.error('Error submitting report:', error);
    }
  };

  const fileList = files.map((file, index) => (
    <div key={index}>{file.name}</div>
  ));

  const close = () => {
    closeModal(false);
  };

  return (
    <div className='container-modal'>
      {alert &&
        <div className='content-alert'>
          <div className='content-modal-alert'>
            <h2>Laporanmu telah terkirim </h2>
            <button onClick={close}>Selesai</button>
          </div>
        </div>
      }
      {!alert &&
        <div className='content-modal'>
          <div className='header-modal'>
            <img src={ImgAdd} alt="add" />
            <div className='title-modal'>
              <h3>Tambah Laporan</h3>
              <h5>Mohon isi laporan dengan data yang benar</h5>
            </div>
            <div className='close-modal' onClick={close}>
              <img src={ImgClose} alt="close" />
            </div>
          </div>
          <div className='body-modal'>
            <form onSubmit={handleSubmit}>
              <label htmlFor="location">Lokasi*</label>
              <input 
                type="text" 
                id='location' 
                value={formData.location}
                onChange={handleChange}
                required 
              />
               <div className='double-box-input'>
                <div className='box-input'>
                <label htmlFor="numberOfPotholes">Estimasi Jumlah Lubang*</label>
                  <input 
                    type="number" 
                    id='numberOfPotholes' 
                    value={formData.numberOfPotholes}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className='box-input'>
                  <label htmlFor="additionalDetails">Detail Tambahan (opsional)</label>
                  <input 
                    type="text" 
                    id='additionalDetails' 
                    value={formData.additionalDetails}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="drop-container" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
                <input 
                  type="file" 
                  id="fileInput" 
                  className="drop-input" 
                  accept="image/*" 
                  multiple 
                  onChange={handleFileInputChange} 
                />
                <label htmlFor="fileInput" className="drop-label">
                  <img src={ImgUpload} alt="upload" />
                  <div>
                    <p>Select a file or drag and drop here</p>
                    <p>JPG, PNG or PDF, file size no more than 10MB</p>
                  </div>
                  <img src={ImgSelect} alt="select" />
                </label>
                <div className="file-list">{fileList}</div>
              </div>
              <div>
                <div className='btn-group'>
                  <button type='button' className='btn-remove' onClick={close}>Batal</button>
                  <button type='submit'>Kirim</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      }
    </div>
  );
};



const Home = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const getSearch = window.location.search;
    if (getSearch === '?faq') {
      scrollTo('faq');
      window.history.pushState({}, document.title, "/");
    }
    if (getSearch === '?aboutUs') {
      scrollTo('aboutUs');
      window.history.pushState({}, document.title, "/");
    }

    // Ambil username dari localStorage jika ada
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const scrollTo = (page) => {
    location.href = `#${page}`;
  };

  const accordion = (id) => {
    let acc = document.getElementById(`acc${id}`);
    let panel = document.getElementById(`panel${id}`);
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
      acc.classList.toggle('accordion-active');
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
      acc.classList.toggle('accordion-active');
    }
  };

  const handleModal = () => {
    setOpen(true);
  };

  const handleClose = (e) => {
    setOpen(e);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    setUsername(null);
    navigate('/login');
  };

  return (
    <div className='page'>
      {open && <Modal closeModal={handleClose} />}
      <nav id='beranda'>
        <div className='section-navbar'>
          <img src={iconHolify} alt="icon" />
          <div className='section-list'>
            <h4 className='active'>Beranda</h4>
            <h4 onClick={() => navigate('/history')}>Riwayat</h4>
            <h4 onClick={() => scrollTo('faq')}>FAQ</h4>
            <h4 onClick={() => scrollTo('aboutUs')}>Tentang Kami</h4>
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
        <div className='section-main'>
          <div className='left-side'>
            <h1>Tempat Pelaporan</h1>
            <h1>Jalan Rusak</h1>
            <p>Kami akan meneruskan laporan ke pemerintah setempat agar cepat diperbaiki.</p>
            <button onClick={handleModal}>Lapor</button>
          </div>
          <div className='right-side'>
            <img src={ImageCar} alt="Car" width={350} />
          </div>
        </div>
        <div className='section-support'>
          <h2>Didukung oleh</h2>
          <p>Didukung oleh Pemerintah Kota Medan dan Kementerian PUPR</p>
          <div className='img-support'>
            <img src={ImageMdn} alt="medan" />
            <img src={ImagePupr} alt="pupr" />
          </div>
        </div>
        <div className='section-information'>
          <div className='left-side'>
            <img src={ImageAct} alt="activity" />
          </div>
          <div className='right-side'>
            <div className='content-info'>
              <img src={ImagePlatform} alt="platform" />
              <h4>Platform</h4>
              <p>Menggunakan website yang bisa diakses dimana saja</p>
            </div>
            <div className='content-info'>
              <img src={ImageInfo} alt="info" />
              <h4>Informasi</h4>
              <p>Memberikan informasi jalan yang rusak</p>
            </div>
            <div className='content-info'>
              <img src={ImageReport} alt="report" />
              <h4>Laporan</h4>
              <p>Menyediakan layanan pelaporan jalan rusak</p>
            </div>
            <div className='content-info'>
              <img src={ImageDatabase} alt="database" />
              <h4>Terintegrasi</h4>
              <p>Terintegrasi dengan informasi terbaru</p>
            </div>
          </div>
        </div>
        <div id='faq' className='section-faq'>
          <h2>FAQ</h2>
          <p>Pertanyaan yang sering muncul</p>
          <button id='acc1' className='accordion' onClick={() => accordion(1)}>
            <h3>01</h3>
            <h3>Bagaimana cara membuat laporan?</h3>
            <div className='btn-accordion'>
              <AddRoundedIcon fontSize='small' />
            </div>
          </button>
          <div id='panel1' className='panel'>
            <h5>
              Anda dapat membuat laporan dengan menekan tombol “Lapor” dan selanjutnya akan diarahkan ke formulir pelaporan.
            </h5>
          </div>
          <button id='acc2' className='accordion' onClick={() => accordion(2)}>
            <h3>02</h3>
            <h3>Bagaimana melihat laporan yang sudah terkirim?</h3>
            <div className='btn-accordion'>
              <AddRoundedIcon fontSize='small' />
            </div>
          </button>
          <div id='panel2' className='panel'>
            <h5>
              Anda bisa melihatnya di Riwayat laporan.
            </h5>
          </div>
          <button id='acc3' className='accordion' onClick={() => accordion(3)}>
            <h3>03</h3>
            <h3>Apa saja yang diperlukan dalam formulir laporan?</h3>
            <div className='btn-accordion'>
              <AddRoundedIcon fontSize='small' />
            </div>
          </button>
          <div id='panel3' className='panel'>
            <h5>
              Memasukkan lokasi yang Anda mau lapor, setelah itu ada berapa sekiranya estimasi lubang yang Anda temui, dan masukkan foto atau gambar lubang yang ingin Anda lapor.
            </h5>
          </div>
          <button id='acc4' className='accordion' onClick={() => accordion(4)}>
            <h3>04</h3>
            <h3>Bagaimana cara menghubungi kami?</h3>
            <div className='btn-accordion'>
              <AddRoundedIcon fontSize='small' />
            </div>
          </button>
          <div id='panel4' className='panel'>
            <h5>
              Anda bisa menghubungi kami melalui sosial media kami yang tertera di pojok kanan paling bawah.
            </h5>
          </div>
        </div>
        <div id='aboutUs' className='section-about-us'>
          <h2>Tentang Kami</h2>
          <div className='content-about-us'>
            <div className='left-side'>
              <img src={ImageHolify} alt="holify-text" />
            </div>
            <div className='right-side'>
              <h5>
                Holify adalah platform yang menyediakan solusi dalam bidang infrastruktur jalanan. Platform ini memudahkan untuk melakukan pelaporan dan mencari informasi terkait jalanan rusak.
              </h5>
              <h5>
                Dengan Holify, Anda dapat melakukan pelaporan terkait jalanan rusak di daerah Anda dengan cepat dan mudah secara online tanpa harus melaporkan secara langsung ke pihak berwajib karena dengan Holify akan menyampaikan laporan Anda kepada pihak pemerintah.
              </h5>
            </div>
          </div>
        </div>
        <div className='section-question'>
          <h2>Di Sekitar Anda Ada Jalan Rusak ?</h2>
          <button onClick={handleModal}>Laporkan Sekarang</button>
        </div>
        <div className='section-advice'>
          <div className='left-side'>
            <h2>Kritik dan Saran</h2>
          </div>
          <div className='right-side'>
            <form>
              <div className='input-name-number'>
                <input type="text" placeholder='Nama Lengkap' />
                <input type="number" placeholder='Nomor Telepon' />
              </div>
              <input type="email" placeholder='Email' />
              <input type="text" placeholder='Pesan' />
              <button>Kirim</button>
            </form>
          </div>
        </div>
        <footer>
          <div className='section-footer'>
            <div className='section-list'>
              <p onClick={() => scrollTo('beranda')}>Beranda</p>
              <p onClick={() => navigate('/history')}>Riwayat</p>
              <p onClick={() => scrollTo('faq')}>FAQ</p>
              <p onClick={() => scrollTo('aboutUs')}>Tentang Kami</p>
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

export default Home;
         