import './login.scss';
import { useNavigate } from 'react-router-dom';
import iconText from '../../assets/holify-text.png';
import imgCar from '../../assets/car2.png';
import imgGoogle from '../../assets/google.png';

const Login = () => {
  const navigate = useNavigate();

  function Login(e) {
    e.preventDefault();
    localStorage.setItem('login', 'Pattimura');
    navigate('/');
  }

  return (
    <div className='page'>
      <div className='section-login'>
        <div className='left-side'>
          <img src={iconText} alt="icon" onClick={() => navigate('/')} />
          <img className='img-btm' src={imgCar} alt="car2" />
          <h5>Jika kamu belum memiliki akun
            kamu bisa <span onClick={() => navigate('/register')}>Daftar disini!</span> </h5>
        </div>
        <div className='right-side'>
          <div className='options-login'>
            <h4 className='active'>Masuk</h4>
            <h4 onClick={() => navigate('/register')}>Daftar</h4>
          </div>
          <form onSubmit={Login}>
            <label htmlFor='email'>Email</label>
            <input type="email" id='email' required />
            <label htmlFor='pass'>Password</label>
            <input type="password" id='pass' required />
            <p>Lupa password?</p>
            <button className='btn-login' type='submit'>Masuk</button>
          </form>
          <p>Atau lanjut dengan</p>
          <img className='img-google' src={imgGoogle} alt="google" />
        </div>
      </div>
    </div>
  )
}

export default Login
