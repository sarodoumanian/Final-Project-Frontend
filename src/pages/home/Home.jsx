import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Rightbar from '../../components/rightbar/Rightbar';
import HomeFeed from '../../components/homeFeed/HomeFeed';
import './home.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!Cookies.get('id')) {
      navigate('/login');
    }
  }, []);

  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <HomeFeed />
        <Rightbar profile={false} />
      </div>
    </>
  );
}
