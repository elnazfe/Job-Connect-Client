import { Link } from "react-router-dom";
import React, { useContext } from "react";

import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { AuthContext } from "../Context/auth.context";

function Navbar() {
  const { user, logoutUser } = useContext(AuthContext);


  return (
    <div>
      <Toolbar className="nav-buttons">
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        {!user && (
          <>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          </>
        )}
        {user && (
          <>
            <Button
              color="inherit"
              component={Link}
              to={`/profile/${user._id}`}
            >
              My Dashboard
            </Button>
            <Button color="inherit" component={Link} to="/jobs">
              My Jobs
            </Button>
            <Button onClick={logoutUser}
            color="inherit" component={Link} to="/logout">
              Logout
            </Button>
            <Stack direction="row" spacing={2}>
              <Avatar alt="Remy Sharp" src="/img_avatar.png" />
            </Stack>
          </>
        )}
      </Toolbar>
      <hr className="navline"></hr>
    </div>
  );
}

export default Navbar;