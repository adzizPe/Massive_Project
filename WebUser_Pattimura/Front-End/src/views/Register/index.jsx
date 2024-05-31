import './register.scss';
import { useNavigate } from 'react-router-dom';
import iconText from '../../assets/holify-text.png';
import imgCar from '../../assets/car2.png';
import imgGoogle from '../../assets/google.png';

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className='page'>
      <div className='section-login'>
        <div className='left-side'>
          <img src={iconText} alt="icon" onClick={() => navigate('/')} />
          <img className='img-btm' src={imgCar} alt="car2" />
          <h5>Lengkapi data diri anda untuk
            melanjutkan pendaftaran </h5>
        </div>
        <div className='right-side'>
          <div className='options-register'>
            <h4 onClick={() => navigate('/login')}>Masuk</h4>
            <h4 className='active' >Daftar</h4>
          </div>
          <form>
            <label htmlFor='nama'>Nama Lengkap</label>
            <input type="text" id='nama' />
            <div className='double-box-input'>
              <div className='left-box'>
                <label htmlFor='user'>Username</label>
                <input type="text" id='user' />
              </div>
              <div>
                <label htmlFor='phone'>Nomor Telepon</label>
                <input type="number" id='phone' />
              </div>
            </div>
            <label htmlFor='email'>Email</label>
            <input type="email" id='email' />
            <label htmlFor='pass'>Password</label>
            <input type="password" id='pass' />
            <button className='btn-login'>Daftar</button>
          </form>
          <p>Atau lanjut dengan</p>
          <img className='img-google' src={imgGoogle} alt="google" />
        </div>
      </div>
    </div>
  )
}

export default Register
