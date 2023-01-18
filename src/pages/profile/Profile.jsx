import './profile.css';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import { useRef, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PROFILE } from '../../graphql/query';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Profile() {
  const fileRef = useRef(null);
  const [showUpload, setShowUpload] = useState(false);
  const [showRemove, setShowRemove] = useState(false);
  const [file, setFile] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const { data, loading } = useQuery(GET_PROFILE, {
    fetchPolicy: 'no-cache'
  });

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setFileUrl(URL.createObjectURL(e.target.files[0]));
    setShowRemove(true);
  };

  const updateImage = (e) => {
    let formData = new FormData();
    formData.append('image', file);
    axios({
      method: 'post',
      url: 'http://localhost:4000/profile-picture',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true
    })
      .then((res) => {
        console.log(res.data);
        axios
          .get('http://localhost:4000/getProfile', { withCredentials: true })
          .then((res) => {
            console.log(res.data);
            localStorage.setItem('user', JSON.stringify(res.data));
            window.location.reload();
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log('Catch error---> ', err));
  };

  return (
    <>
      {!loading && (
        <>
          <Topbar />
          <div className="profile">
            <Sidebar />
            <div className="profileRight">
              <div className="profileRightTop">
                <div className="profileCover">
                  <div>
                    <img
                      onMouseEnter={() => setShowUpload(true)}
                      onMouseLeave={() => setShowUpload(false)}
                      className="profileUserImg"
                      src={fileUrl || `http://localhost:4000/profilePictures/${data?.getProfile.profilePic}`}
                      alt=""
                    />
                    {showUpload && (
                      <>
                        <button onClick={() => fileRef.current.click()} onMouseEnter={() => setShowUpload(true)} onMouseLeave={() => setShowUpload(false)} className="profileUserImg2">
                          Upload
                        </button>
                        <input onChange={handleChange} ref={fileRef} type="file" hidden />
                      </>
                    )}
                    {fileUrl && (
                      <div className="btns">
                        <button className="btnn btnn1" onClick={updateImage}>
                          Save
                        </button>
                        <button className="btnn btnn2" onClick={() => setFileUrl('')}>
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="info">
                    <table>
                      <tr>
                        <td className="td tdkey">Name:</td>
                        <td className="td tdvalue">{data?.getProfile.firstName + ' ' + data?.getProfile.lastName}</td>
                      </tr>
                      <tr>
                        <td className="td tdkey">Email:</td>
                        <td className="td tdvalue">{data?.getProfile.email}</td>
                      </tr>
                      <tr>
                        <td className="td tdkey">Role:</td>
                        <td className="td tdvalue">{data?.getProfile.role}</td>
                      </tr>
                      <tr>
                        <td className="td tdkey">phone:</td>
                        <td className="td tdvalue">{data?.getProfile.phoneNumber || 'n/a'}</td>
                      </tr>
                      <tr>
                        <td className="td tdkey">posts:</td>
                        <td className="td tdvalue">{data?.getProfile.posts}</td>
                      </tr>
                    </table>
                    <button className="updateProfile">
                      <Link to="/update" style={{ textDecoration: 'none', color: 'black' }}>
                        Update Profile
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
              <div className="profileRightBottom">
                <Feed />
                <Rightbar profile />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
