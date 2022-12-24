import './profile.css';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
// import { useParams } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PROFILE } from '../../graphql/query';
import axios from 'axios';
import { getProfile } from '../../helpers/getProfile';

export default function Profile() {
  const fileRef = useRef(null);
  const [showUpload, setShowUpload] = useState(false);
  const { data, loading } = useQuery(GET_PROFILE, {
    fetchPolicy: 'no-cache'
  });

  const updateImage = (e) => {
    console.log(e.target.files[0]);
    let formData = new FormData();
    formData.append('image', e.target.files[0]);
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

  // useEffect(() => {
  //   console.log(data);
  // }, [id]);

  // setTimeout(() => {
  //   console.log(1111111);
  //   console.log(data);
  //   console.log(1111111);
  // }, 2000);
  // console.log(user);

  return (
    <>
      {loading ? (
        <p>loading......</p>
      ) : (
        <>
          <Topbar />
          <div className="profile">
            <Sidebar />
            <div className="profileRight">
              <div className="profileRightTop">
                <div className="profileCover">
                  <img className="profileCoverImg" src="https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg" alt="" />
                  <img
                    onMouseEnter={() => setShowUpload(true)}
                    onMouseLeave={() => setShowUpload(false)}
                    className="profileUserImg"
                    src={`http://localhost:4000/profilePictures/${data.getProfile.profilePic}`}
                    alt=""
                  />
                  {showUpload && (
                    <>
                      <button onClick={() => fileRef.current.click()} onMouseEnter={() => setShowUpload(true)} onMouseLeave={() => setShowUpload(false)} className="profileUserImg2">
                        Upload
                      </button>
                      <input onChange={updateImage} ref={fileRef} type="file" hidden />
                    </>
                  )}
                </div>
                <div className="profileInfo">
                  <h4 className="profileInfoName">{data.getProfile.firstName + ' ' + data.getProfile.lastName}</h4>
                  <span className="profileInfoDesc">Hello my friends!</span>
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
