import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

// import '../Components/Navbar.css';

function Navbar() {
  return (
    <div>
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/dashboard">
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
        <img src='public/img_avatar.png' alt='profileimage'></img>
      </Toolbar>
    </AppBar>
    </div>
  );
}

export default Navbar;