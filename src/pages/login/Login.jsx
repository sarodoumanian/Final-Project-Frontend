import { useState } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { SIGN_IN } from '../../graphql/mutation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [login] = useMutation(SIGN_IN, {
    fetchPolicy: 'no-cache'
  });

  const signin = (e) => {
    e.preventDefault();
    login({
      variables: {
        email,
        password
      }
    })
      .then((res) => {
        if (res.data.login.message) return setError(res.data.login.message);
        navigate(`/profile`);
        localStorage.setItem('user', JSON.stringify(res.data.login));
        console.log(res.data);
        console.log(res.data.login);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Recipe Share</h3>
          <span className="loginDesc">Discover and share new recipes on our platform. Create an account to post your own recipes with photos, or browse recipes from others. Happy cooking!</span>
        </div>
        <div className="loginRight">
          {error && <h1>{error}</h1>}
          <form className="loginBox">
            <input type="email" placeholder="Email" className="loginInput" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" className="loginInput" onChange={(e) => setPassword(e.target.value)} />
            <button className="loginButton" onClick={signin}>
              Log In
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <Link to="/register">
              <button className="loginRegisterButton">Create a New Account</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
