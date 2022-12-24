import './singlePost.css';
import React, { useEffect } from 'react';
import moment from 'moment/moment';
import { useParams, useNavigate } from 'react-router-dom';
// import Rightbar from '../../components/rightbar/Rightbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import { useQuery, useMutation } from '@apollo/client';
import { GET_POST_BY_ID } from '../../graphql/query';
import { APPROVE, REJECT } from '../../graphql/mutation';

function SinglePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading } = useQuery(GET_POST_BY_ID, {
    fetchPolicy: 'no-cache',
    variables: { id: Number(id) }
  });

  const [approvePost] = useMutation(APPROVE, {
    fetchPolicy: 'no-cache'
  });

  const [rejectPost] = useMutation(REJECT, {
    fetchPolicy: 'no-cache'
  });

  useEffect(() => {
    console.log('roleeeeeeeeeeeeeeee');
    console.log(JSON.parse(localStorage.getItem('user')).role);
    console.log('roleeeeeeeeeeeeeeee');
    if (JSON.parse(localStorage.getItem('user')).role === 'user') navigate('/');
  }, []);

  const approve = () => {
    approvePost({
      variables: { id: Number(id) }
    })
      .then((res) => {
        if ((res.data.approvePost = 'Post Approved!')) navigate('/');
      })
      .catch((err) => console.log(err));
  };

  const reject = () => {
    rejectPost({
      variables: { id: Number(id) }
    })
      .then((res) => {
        if ((res.data.rejectPost = 'Post Rejected!')) navigate('/');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {loading ? (
        <p>LOADING...</p>
      ) : (
        <>
          <Topbar />
          <div className="profile">
            <Sidebar />
            <div className="profileRight">
              <div className="profileRightBottom">
                <div className="feed">
                  <div className="feedWrapper">
                    {/* <div className="postTop" style={{ display: 'inline-block', alignItems: 'center' }}>
                      <div className="postTopLeft" style={{ display: 'flex', alignItems: 'center' }}>
                        <img className="postProfileImg" src={`http://localhost:4000/profilePictures/${data.getPostById.owner.profilePic}`} alt="" />
                        <span className="postUsername">{data.getPostById.owner.firstName + ' ' + data.getPostById.owner.lastName}</span>
                        <span className="postDate">{data.getPostById.createdAt}</span>
                        <span className="postText">{data.getPostById.title}</span>
                      </div>
                    </div>
                    <div className="postCenter">
                      <img className="postImg" src={`http://localhost:4000/posts/${data.getPostById.image}`} alt="" />
                    </div> */}
                    <div className="mainDiv">
                      <div className="divForTexts">
                        <div className="imageAndName">
                          <img className="postProfileImg" src={`http://localhost:4000/profilePictures/${data.getPostById.owner.profilePic}`} alt="" />
                          <div style={{ margin: 'auto' }}>{data.getPostById.owner.firstName + ' ' + data.getPostById.owner.lastName}</div>
                        </div>
                        {/* <div className="text">{data.getPostById.createdAt}</div> */}
                        <div className="text">{moment(new Date(+data.getPostById.createdAt)).fromNow()}</div>
                        <div className="text">{data.getPostById.title}</div>
                        <div className="buttons">
                          <button className="btn" onClick={approve}>
                            Approve
                          </button>
                          <button className="btn" onClick={reject}>
                            Reject
                          </button>
                        </div>
                      </div>
                      <div className="imageDiv">
                        <img className="img" src={`http://localhost:4000/posts/${data.getPostById.image}`} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
                {/* <Rightbar profile /> */}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SinglePost;
