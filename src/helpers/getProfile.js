import axios from 'axios';

export const getProfile = () => {
  axios
    .get('http://localhost:4000/getProfile', { withCredentials: true })
    .then((res) => {
      console.log(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
    })
    .catch((err) => console.log(err));
};
