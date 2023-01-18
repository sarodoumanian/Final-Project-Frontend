import React from 'react';
import { useState } from 'react';
import './update.css';
import { GET_PROFILE } from '../../graphql/query';
import { CHANGE_PASSWORD, UPDATE_PROFILE } from '../../graphql/mutation';
import { useMutation, useQuery } from '@apollo/client';
import Topbar from '../../components/topbar/Topbar';
import axios from 'axios';

function Update() {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [msg1, setMsg1] = useState('');
  const [msg2, setMsg2] = useState('');
  const [msg1Color, setMsg1Color] = useState('');
  const [msg2Color, setMsg2Color] = useState('');

  const { data: userInfo } = useQuery(GET_PROFILE, { fetchPolicy: 'no-cache' });

  const [update] = useMutation(UPDATE_PROFILE, { fetchPolicy: 'no-cache' });
  const [changePassword] = useMutation(CHANGE_PASSWORD, { fetchPolicy: 'no-cache' });

  const updateUserHandler = () => {
    update({
      variables: {
        firstName,
        lastName,
        email,
        phoneNumber
      }
    })
      .then((res) => {
        if (res.data.updateUser.__typename === 'Response') {
          setMsg1(res.data.updateUser.message);
          setTimeout(() => {
            setMsg1('');
          }, 5000);
          setMsg1Color('green');
          axios
            .get('http://localhost:4000/getProfile', { withCredentials: true })
            .then((res) => {
              localStorage.setItem('user', JSON.stringify(res.data));
            })
            .catch((err) => console.log(err));
        } else if (res.data.updateUser.__typename === 'Error') {
          setMsg1(res.data.updateUser.message);
          setMsg1Color('red');
        }
      })
      .catch((err) => console.log(err));
  };

  const changePasswordHandler = (e) => {
    changePassword({
      variables: { oldPassword, newPassword, confirmPassword }
    })
      .then((res) => {
        if (res.data.changePassword.__typename === 'Response') {
          setMsg2(res.data.changePassword.message);
          setMsg2Color('green');
          setOldPassword('');
          setNewPassword('');
          setConfirmPassword('');
          setTimeout(() => {
            setMsg2('');
          }, 5000);
        } else if (res.data.changePassword.__typename === 'Error') {
          setMsg2(res.data.changePassword.message);
          setMsg2Color('red');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Topbar />
      <div className="mainDiv">
        <div className="wrapper">
          <div className="msg">{msg1 && <p style={{ color: msg1Color }}>{msg1}</p>}</div>
          <table>
            <tr>
              <td>
                <label className="label" htmlFor="firstName">
                  First Name:
                </label>
              </td>
              <td>
                <input defaultValue={userInfo?.getProfile?.firstName} className="input" type="text" id="firstName" name="firstName" onChange={(e) => setFirstName(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>
                <label className="label" htmlFor="lastName">
                  Last Name:
                </label>
              </td>
              <td>
                <input defaultValue={userInfo?.getProfile?.lastName} className="input" type="text" id="lastName" name="lastName" onChange={(e) => setLastName(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>
                <label className="label" htmlFor="email">
                  Email:
                </label>
              </td>
              <td>
                <input defaultValue={userInfo?.getProfile?.email} className="input" type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>
                <label className="label" htmlFor="phoneNumber">
                  Phone Number:
                </label>
              </td>
              <td>
                <input defaultValue={userInfo?.getProfile?.phoneNumber} className="input" type="text" id="phoneNumber" name="phoneNumber" onChange={(e) => setPhoneNumber(e.target.value)} />
              </td>
            </tr>
          </table>
          <div className="buttons">
            <button className="updateProfile" onClick={updateUserHandler}>
              Save
            </button>
            <p className="changePassword" onClick={() => setShowChangePassword(!showChangePassword)}>
              Change Password
            </p>
          </div>
          {showChangePassword && (
            <div className="secondDiv">
              <div className="msg">{msg2 && <p style={{ color: msg2Color }}>{msg2}</p>}</div>
              <table>
                <tr>
                  <td>
                    <label className="label" htmlFor="firstName">
                      Old Password:
                    </label>
                  </td>
                  <td>
                    <input value={oldPassword} className="input-2" type="password" onChange={(e) => setOldPassword(e.target.value)} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className="label" htmlFor="lastName">
                      New Password:
                    </label>
                  </td>
                  <td>
                    <input value={newPassword} className="input-2" type="password" onChange={(e) => setNewPassword(e.target.value)} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className="label" htmlFor="email">
                      Confirm Password:
                    </label>
                  </td>
                  <td>
                    <input value={confirmPassword} className="input-2" type="password" onChange={(e) => setConfirmPassword(e.target.value)} />
                  </td>
                </tr>
              </table>
              <div className="buttons">
                <button className="updateProfile" onClick={changePasswordHandler} disabled={!oldPassword || !newPassword || !confirmPassword}>
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Update;
