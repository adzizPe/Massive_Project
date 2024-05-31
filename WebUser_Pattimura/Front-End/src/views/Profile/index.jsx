import './profile.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import iconHolify from '../../assets/holify-icon.png';
import imgProfile from '../../assets/profile.png';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

const Profile = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0)

    const getLogin = localStorage.getItem('login');
    if (getLogin) {
      setLogin(getLogin)
    }
  }, [login])

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
            {login === 'Pattimura' ?
              <>
                <button onClick={() => navigate('/profile')}>Hi, {login}</button>
                <button className='btn-logout' onClick={() => { localStorage.removeItem('login'); navigate('/') }}><LogoutRoundedIcon /></button>
              </>
              :
              <button onClick={() => navigate('/login')}>Masuk</button>
            }
          </div>
        </div>
      </nav>
      <main>
        <div className='section-profile'>
          <h3>Edit Profile</h3>
          <div className='content-profile'>
            <div className='left-side'>
              <label htmlFor="nama">Nama Lengkap</label>
              <input type="text" id='nama' />
              <label htmlFor="email">Email</label>
              <input type="email" id='email' />
              <label htmlFor="oldPass">Password Lama</label>
              <input type="password" id='oldPass' />
              <label htmlFor="newPass">Password Baru</label>
              <input type="password" id='newPass' />
            </div>
            <div className='center-side'>
              <div className='center-input'>
                <label htmlFor="user">Username</label>
                <input type="text" id='user' />
                <label htmlFor="numb">Nomor Telepon</label>
                <input type="number" id='numb' />
              </div>
              <button>Simpan</button>
            </div>
            <div className='right-side'>
              <img src={imgProfile} alt="profile" width={300} />
              <div className='section-btn-profile'>
                <button>Hapus</button>
                <button>Ganti</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Profile
