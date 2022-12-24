import Post from '../post/Post';
import Share from '../share/Share';
import './homeFeed.css';
// import { Posts } from '../../dummyData';
import { Close } from '@material-ui/icons';

import { useQuery } from '@apollo/client';

import { GET_ALL_POSTS } from '../../graphql/query';
import { useState } from 'react';

export default function Feed() {
  // const [show, setShow] = useState(false);
  const [msg, setMsg] = useState('');
  const { data, loading } = useQuery(GET_ALL_POSTS, {
    fetchPolicy: 'no-cache'
  });

  return (
    <>
      {loading ? (
        <p>loading...</p>
      ) : (
        <div className="feed">
          {msg && (
            <div className="topMsg">
              {/* <p className="msgText">Your post was successfully created, wait for the admins to approve, you can still see your post from your profile</p> */}
              <p className="msgText">{msg}</p>
              <span className="close" onClick={() => setMsg('')}>
                <Close className="close" />
              </span>
            </div>
          )}

          <div className="feedWrapper">
            <Share setMsg={setMsg} />
            {/* {Posts.map((p) => (
              <Post key={p.id} post={p} />
            ))} */}
            {data?.getAllPosts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
