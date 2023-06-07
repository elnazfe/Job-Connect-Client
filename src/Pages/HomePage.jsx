//HomePAge
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/auth.context";

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


function HomePage() {
  const { user, authenticateUser } = useContext(AuthContext);

  useEffect(() => {
    authenticateUser();
  }, []);


  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#8C52FF"),
    backgroundColor: "#8C52FF",
    '&:hover': {
      backgroundColor: "#8C52FF",
    },
  }));


    return (
      <div
          style={{
          display: 'flex',

          fontFamily: "Tahoma"
        }}
      >
        <div>
          <h1 style={{ marginLeft: "15%", marginTop:'10%', textAlign: "left" }}>Achieving Your Career Goals</h1>

          <h3 style={{ marginLeft: "15%", marginTop:'10%', textAlign: "left" }}> Simplify your job search and achieve your career goals with JobConnect today. </h3>

          <br/>
          <br/>
        <ColorButton component={Link} to="/signup">Sign Up Here</ColorButton>
<br/>
<br/>
<p>Already have an account?</p>
        <Link to="/login">
          Log In here
        </Link>
<br/>
        </div>

        <img src="/icon (9).svg" alt="Image" style={{ width: "500px", margin: "2%", marginRight: '5%'}} />

      </div>
      );
  }

  export default HomePage;