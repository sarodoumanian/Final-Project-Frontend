import { useState } from 'react';
import './register.css';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REGISTER } from '../../graphql/mutation';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [register] = useMutation(REGISTER);

  const registerHandler = (e) => {
    e.preventDefault();
    console.log('handler');
    register({
      variables: {
        firstName,
        lastName,
        email,
        password
      }
    })
      .then((res) => {
        // if (res.data.login.message) return setError(res.data.login.message);
        // navigate(`/profile/${res.data.login.id}`);
        navigate(`/login`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Lamasocial</h3>
          <span className="loginDesc">Connect with friends and the world around you on Lamasocial.</span>
        </div>
        <div className="loginRight">
          {error && <h1>{error}</h1>}
          <div className="loginBox">
            <input type="text" placeholder="Fist Name" className="loginInput" onChange={(e) => setFirstName(e.target.value)} />
            <br></br>
            <input type="text" placeholder="Last Name" className="loginInput" onChange={(e) => setLastName(e.target.value)} />
            <br></br>
            <input type="email" placeholder="Email" className="loginInput" onChange={(e) => setEmail(e.target.value)} />
            <br></br>
            <input type="password" placeholder="Password" className="loginInput" onChange={(e) => setPassword(e.target.value)} />
            <br></br>
            <button className="loginButton" onClick={registerHandler}>
              Sign Up
            </button>
            <Link to="/login">
              <button className="loginRegisterButton">Log into Account</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
