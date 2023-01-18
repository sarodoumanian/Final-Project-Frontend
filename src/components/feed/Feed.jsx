import Post from '../post/Post';
import Share from '../share/Share';
import './feed.css';
// import { Posts } from '../../dummyData';
import { useQuery } from '@apollo/client';

import { GET_ALL_MY_POSTS } from '../../graphql/query';
import { useEffect } from 'react';
import { useState } from 'react';

export default function Feed() {
  const [stateData, setStateData] = useState(null);
  const { data, loading } = useQuery(GET_ALL_MY_POSTS, {
    fetchPolicy: 'no-cache'
  });

  useEffect(() => {
    console.log(data);
    data && setStateData(data.getAllMyPosts);
  }, [data]);

  return (
    <>
      {!loading && (
        <div className="feed">
          <div className="feedWrapper">
            <Share setStateData={setStateData} stateData={stateData} />
            {stateData?.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
