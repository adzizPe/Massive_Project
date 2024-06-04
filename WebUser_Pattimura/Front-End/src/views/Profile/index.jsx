import './profile.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import iconHolify from '../../assets/holify-icon.png';
import imgProfile from '../../assets/profile.png';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

const Profile = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null); // State untuk menyimpan gambar profil
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    oldPassword: '',
    newPassword: '',
    username: '',
    phoneNumber: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }

    // Ambil data pengguna dari localStorage atau backend
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    if (storedUserData) {
      setUserData(storedUserData);
    }
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(URL.createObjectURL(file));
  };

  const handleRemoveProfilePicture = () => {
    setProfilePicture(null);
  };

  const handleSaveChanges = () => {
    // Simpan perubahan ke localStorage atau kirim ke backend
    localStorage.setItem('userData', JSON.stringify(userData));
    alert('Perubahan berhasil disimpan.');
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    localStorage.removeItem('userData');
    setUsername(null);
    navigate('/login');
  };

  return (
    <div className='page'>
      <nav id='beranda'>
        <div className='section-navbar'>
          <img src={iconHolify} alt="icon" />
          <div className='section-list'>
            <h4 onClick={() => navigate('/')}>Beranda</h4>
            <h4 onClick={() => navigate('/history')}>Riwayat</h4>
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
        <div className='section-profile'>
          <h3>Edit Profile</h3>
          <div className='content-profile'>
            <div className='left-side'>
              <label htmlFor="name">Nama Lengkap</label>
              <input type="text" id='name' value={userData.name} onChange={handleInputChange} />
              <label htmlFor="email">Email</label>
              <input type="email" id='email' value={userData.email} onChange={handleInputChange} />
              <label htmlFor="oldPassword">Password Lama</label>
              <input type="password" id='oldPassword' value={userData.oldPassword} onChange={handleInputChange} />
              <label htmlFor="newPassword">Password Baru</label>
              <input type="password" id='newPassword' value={userData.newPassword} onChange={handleInputChange} />
            </div>
            <div className='center-side'>
              <div className='center-input'>
                <label htmlFor="username">Username</label>
                <input type="text" id='username' value={userData.username} onChange={handleInputChange} />
                <label htmlFor="phoneNumber">Nomor Telepon</label>
                <input type="number" id='phoneNumber' value={userData.phoneNumber} onChange={handleInputChange} />
              </div>
              <button onClick={handleSaveChanges}>Simpan</button>
            </div>
            <div className='right-side'>
              <img src={profilePicture || imgProfile} alt="profile" width={300} />
              <div className='section-btn-profile'>
                <input type="file" accept="image/*" onChange={handleProfilePictureChange} style={{ display: 'none' }} id="upload-button" />
                <button onClick={() => document.getElementById('upload-button').click()}>Ganti</button>
                <button onClick={handleRemoveProfilePicture}>Hapus</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;