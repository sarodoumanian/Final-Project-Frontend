import './profilebyid.css';
import { useQuery } from '@apollo/client';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import { GET_POSTS_BY_USER_ID, GET_USER_BY_ID } from '../../graphql/query';
import Post from '../../components/post/Post';

function Profilebyid() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, loading } = useQuery(GET_USER_BY_ID, {
    variables: { id: Number(id) },
    fetchPolicy: 'no-cache'
  });

  const { data: posts } = useQuery(GET_POSTS_BY_USER_ID, { variables: { userId: Number(id) }, fetchPolicy: 'no-cache' });

  if (id == JSON.parse(localStorage.getItem('user')).id) {
    navigate('/profile');
  }

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
                  <div>
                    <img className="profileUserImg" src={`http://localhost:4000/profilePictures/${data.getUserById.profilePic}`} alt="" />
                  </div>
                  <div className="info">
                    <table>
                      <tr>
                        <td className="td tdkey">Name:</td>
                        <td className="td tdvalue">{data.getUserById.firstName + ' ' + data.getUserById.lastName}</td>
                      </tr>
                      <tr>
                        <td className="td tdkey">Email:</td>
                        <td className="td tdvalue">{data.getUserById.email}</td>
                      </tr>
                      <tr>
                        <td className="td tdkey">Role:</td>
                        <td className="td tdvalue">{data.getUserById.role}</td>
                      </tr>
                      <tr>
                        <td className="td tdkey">phone:</td>
                        <td className="td tdvalue">{data.getUserById.phoneNumber || 'n/a'}</td>
                      </tr>
                      <tr>
                        <td className="td tdkey">posts:</td>
                        <td className="td tdvalue">{data.getUserById.posts}</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
              <div className="feed">
                <div className="feedWrapper" style={{ width: '660px' }}>
                  {posts?.getPostsByUserId.map((post) => (
                    <Post post={post} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Profilebyid;
