import React from 'react';
import './addAdmin.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_ADMINI } from '../../graphql/mutation';

function AddAdmin() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstNameMsg, setFirstNameMsg] = useState('');
  const [lastNameMsg, setLastNameMsg] = useState('');
  const [emailMsg, setEmailMsg] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [createAdmin] = useMutation(CREATE_ADMINI, {
    fetchPolicy: 'no-cache'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationPassed = true;
    if (!firstName) {
      setFirstNameMsg('First Name can not be empty');
      validationPassed = false;
    }
    if (!lastName) {
      setLastNameMsg('Last Name can not be empty');
      validationPassed = false;
    }
    if (!email) {
      setEmailMsg('Email Name can not be empty');
      validationPassed = false;
    }
    if (!password) {
      setPasswordMsg('Password can not be empty');
      validationPassed = false;
    }

    if (password.length < 6) {
      setPasswordMsg('Password must be at least 6 charachters');
      validationPassed = false;
    }

    if (validationPassed) {
      createAdmin({
        variables: { firstName, lastName, email, password }
      })
        .then((res) => {
          if (res.data.createAdmin.id) {
            setSuccessMsg('Admin Successfully Created!');
            setEmailMsg('');
            setFirstNameMsg('');
            setLastNameMsg('');
            setPasswordMsg('');
            e.target.name.value = '';
            e.target.last.value = '';
            e.target.email.value = '';
            e.target.pwd.value = '';
          } else if (res.data.createAdmin.message) {
            setEmailMsg('This email is registered');
          }
        })
        .catch((err) => console.log('add-admin catch error  ', err));
    }

    setTimeout(() => {
      setEmailMsg('');
      setFirstNameMsg('');
      setLastNameMsg('');
      setPasswordMsg('');
      setSuccessMsg('');
    }, 5000);
  };

  return (
    <>
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightBottom">
            <div className="feed">
              <div className="feedWrapper">
                <div className="mainnn">
                  <div className="loginRight length">
                    <form className="loginBox length" onSubmit={handleSubmit}>
                      <div className="successMsg">{successMsg}</div>
                      <input id="name" type="text" placeholder="First Name" className="loginInput" onChange={(e) => setFirstName(e.target.value)} />
                      <div className="div-validation">{firstNameMsg}</div>
                      <input id="last" type="text" placeholder="Last Name" className="loginInput" onChange={(e) => setLastName(e.target.value)} />
                      <div className="div-validation">{lastNameMsg}</div>
                      <input id="email" type="email" placeholder="Email" className="loginInput" onChange={(e) => setEmail(e.target.value)} />
                      <div className="div-validation">{emailMsg}</div>
                      <input id="pwd" type="password" placeholder="Password" className="loginInput" onChange={(e) => setPassword(e.target.value)} />
                      <div className="div-validation">{passwordMsg}</div>
                      <button className="loginRegisterButton btn" type="submit">
                        Add Admin
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddAdmin;
