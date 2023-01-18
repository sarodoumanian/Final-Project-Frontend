import './rightbar.css';
import { Users } from '../../dummyData';
import Online from '../online/Online';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_NEW_POSTS } from '../../graphql/query';

export default function Rightbar({ profile }) {
  const { data, loading } = useQuery(GET_NEW_POSTS, {
    fetchPolicy: 'no-cache'
  });

  const HomeRightbar = () => {
    return (
      <>
        {data?.getNewPosts.length > 0 && <h4 className="rightbarTitle">New Posts</h4>}
        <ul className="rightbarFriendList">
          {data?.getNewPosts.map((post) => (
            <li className="rightbarFriend">
              <div className="rightbarProfileImgContainer">
                <img className="rightbarProfileImg" src="https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg" alt="" />
              </div>
              <span className="rightbarUsername">
                {post.owner.firstName} {post.owner.lastName} posted a new post <Link to={`/post/${post.id}`}>View</Link>
              </span>
            </li>
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">New York</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">Madrid</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">Single</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          <div className="rightbarFollowing">
            <img src="assets/person/1.jpeg" alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img src="assets/person/2.jpeg" alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img src="assets/person/3.jpeg" alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img src="assets/person/4.jpeg" alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img src="assets/person/5.jpeg" alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img src="assets/person/6.jpeg" alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">{!profile && JSON.parse(localStorage.getItem('user')).role !== 'user' && <HomeRightbar />}</div>
    </div>
  );
}

// const HomeRightbar = () => {
//   return (
//     <>
//       <div className="birthdayContainer">
//         <img className="birthdayImg" src="https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg" alt="" />
//         <span className="birthdayText">
//           <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
//         </span>
//       </div>
//       <img className="rightbarAd" src="https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg" alt="" />
//       <h4 className="rightbarTitle">Online Friends</h4>
//       <ul className="rightbarFriendList">
//         {Users.map((u) => (
//           <Online key={u.id} user={u} />
//         ))}
//       </ul>
//     </>
//   );
// };

// return (
//   <div className="rightbar">
//     <div className="rightbarWrapper">{profile ? <ProfileRightbar /> : <HomeRightbar />}</div>
//   </div>
// );
