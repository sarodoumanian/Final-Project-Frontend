import './share.css';
import { useState, useRef } from 'react';
import axios from 'axios';
import { PermMedia } from '@material-ui/icons';
import Select from 'react-select';

export default function Share({ setMsg, setStateData, stateData }) {
  const [title, setTitle] = useState('');
  const [catagory, setCatagory] = useState('');
  const [file, setFile] = useState('');
  const fileInput = useRef();

  const customStyles = {
    control: (base, state) => ({
      ...base,
      cursor: 'pointer'
    })
  };

  const options = [
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' },
    { value: 'desserts', label: 'Desserts' },
    { value: 'snacks', label: 'Snacks' },
    { value: 'appetizers', label: 'Appetizers' },
    { value: 'soups', label: 'Soups' },
    { value: 'main-dishes', label: 'Main dishes' },
    { value: 'side-dishes', label: 'Side dishes' }
  ];
  console.log(window.location);

  const share = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('title', title);
    formData.append('catagory', catagory);
    formData.append('image', file);
    axios({
      method: 'post',
      url: 'http://localhost:4000/post',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true
    })
      .then((res) => {
        console.log(res.data);
        setTitle('');
        setFile('');
        e.target.title.value = '';
        e.target.file.value = '';

        if (window.location.href === 'http://localhost:3000/') {
          window.scrollTo(0, 0);
          setMsg('Your post was successfully created, wait for the admins to approve, you can still see your post from your profile');
          setTimeout(() => {
            setMsg('');
          }, 6000);
        } else if (window.location.href === 'http://localhost:3000/profile') {
          setStateData([res.data, ...stateData]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClick = (e) => {
    e.preventDefault();
    fileInput.current.click();
  };

  return (
    <div className="share">
      <form onSubmit={share}>
        <div className="shareWrapper">
          <div className="shareTop">
            <img className="shareProfileImg" src={`http://localhost:4000/profilePictures/${JSON.parse(localStorage.getItem('user')).profilePic}`} alt="" />
            <input
              id="title"
              name="title"
              placeholder={`What's in your mind ${JSON.parse(localStorage.getItem('user')).firstName}?`}
              className="shareInput"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <hr className="shareHr" />
          <div className="shareBottom">
            <div className="shareOptions">
              <div className="shareOption">
                <button className="imageButton" onClick={handleClick}>
                  <div className="inputImage">
                    <PermMedia htmlColor="tomato" className="shareIcon" />
                    <span className="shareOptionText">Photo</span>
                  </div>
                </button>
                <input ref={fileInput} style={{ display: 'none' }} id="file" name="file" type="file" onChange={(e) => setFile(e.target.files[0])} />
              </div>
              <div className="shareOption">
                <Select styles={customStyles} options={options} placeholder="Select a catagory" onChange={(e) => setCatagory(e.value)} />
              </div>
            </div>
            <button type="submit" className={title && file ? 'shareButton' : 'shareButtonDisabled'} disabled={!title || !file}>
              Share
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
