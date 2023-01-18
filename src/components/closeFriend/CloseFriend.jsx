import { Link } from 'react-router-dom';
import './closeFriend.css';

export default function CloseFriend({ user }) {
  return (
    <Link to={`/profile/${user.id}`} style={{ textDecoration: 'none', color: 'black' }}>
      <li className="sidebarFriend">
        <img className="sidebarFriendImg" src={`http://localhost:4000/profilePictures/${user.profilePic}`} alt="" />
        <span className="sidebarFriendName">{user.firstName + ' ' + user.lastName}</span>
        {user.role === 'superAdmin' && <span className="admin-sidebar">Super Admin</span>}
        {user.role === 'admin' && <span className="admin-sidebar">Admin</span>}
      </li>
    </Link>
  );
}
