import './topbar.css';
import { Search, Person, Chat, Notifications } from '@material-ui/icons';
import { LOGOUT } from '../../graphql/query';
import { useLazyQuery } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';

export default function Topbar() {
  const [logout] = useLazyQuery(LOGOUT, {
    fetchPolicy: 'no-cache'
  });
  const navigate = useNavigate();

  const logoutHandler = () => {
    console.log('clickedddddddd');
    logout().then((res) => {
      navigate('/login');
      localStorage.clear('user');
    });
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">Lamasocial</span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input placeholder="Search for friend, post or video" className="searchInput" />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            <span className="topbarLink">Homepage</span>
          </Link>
          <Link to="/profile" style={{ textDecoration: 'none', color: 'white' }}>
            <span className="topbarLink">Profile</span>
          </Link>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <img src={`http://localhost:4000/profilePictures/${JSON.parse(localStorage.getItem('user')).profilePic}`} alt="" className="topbarImg" />
        <p className="logout" onClick={logoutHandler}>
          Logout
        </p>
      </div>
    </div>
  );
}
