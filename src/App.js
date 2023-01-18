import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';

import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import SinglePost from './pages/singlePost/SinglePost';
import AddAdmin from './pages/addAdmin/AddAdmin';
import Update from './pages/updateProfile/Update';
import Topbar from './components/topbar/Topbar';
import Profilebyid from './pages/profilebyid/Profilebyid';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
  credentials: 'include'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        {/* <Header /> */}
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:id" element={<Profilebyid />} />
            <Route path="/add-admin" element={<AddAdmin />} />
            <Route path="/post/:id" element={<SinglePost />} />
            <Route path="/update" element={<Update />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
