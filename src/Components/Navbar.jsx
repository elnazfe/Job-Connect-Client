import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

const API_URL = "http://localhost:5005"

// import '../Components/Navbar.css';

function Navbar() {
  const [user, setUser] = useState('');
  const { id } = useParams();

  const getUser = async () => {
      try {
        const storedToken = localStorage.getItem('authToken');

        let response = await axios.get(`${API_URL}/api/profile/${user._id}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });

        setUser(response.data);
        console.log(response.data)

      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      getUser();
    }, []); 


  return (
    <div>
      <Toolbar className='nav-buttons'>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to={`/profile/${user._id}`}>
          My Dashboard
        </Button>
        <Button color="inherit" component={Link} to="/jobs">
          My Jobs
        </Button>
        <Button color="inherit" component={Link} to="/signup">
          Signup
        </Button>
        <Button color="inherit" component={Link} to="/login">
          Login
        </Button>
        <Stack direction="row" spacing={2}>
      <Avatar alt="Remy Sharp" src="/img_avatar.png" />
    </Stack>
      </Toolbar>
      <hr className='navline'>
    </hr>
    </div>
  );
}

export default Navbar;