import { Link } from "react-router-dom";
import React, { useContext } from "react";

import Avatar from "@mui/material/Avatar";
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
            <Button
              onClick={logoutUser}
              color="inherit"
              component={Link}
              to="/"
            >
              Logout
            </Button>
            {/* <Link to={`/profile/${user._id}`}>
              <Avatar src={user.profileImg} />
            </Link> */}
          </>
        )}
      </Toolbar>
      <hr className="navline"></hr>
    </div>
  );
}

export default Navbar;
