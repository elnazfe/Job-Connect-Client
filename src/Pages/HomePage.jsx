//HomePAge
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/auth.context";

import { styled } from '@mui/material/styles';
import { Box, Button, Typography } from '@mui/material';


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
<div>
<Box
  sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    /* height: '100vh', */
    fontFamily: "Kanit",
    margin: '0 10%',
  }}
>
  <Box sx={{ maxWidth: '500px', padding: '2rem' }}>
    <Typography variant="h2" sx={{ textAlign: 'left', marginBottom: '1rem',  fontFamily: "Kanit"}}>
      Achieving Your Career Goals
    </Typography>

    <Typography variant="subtitle1" sx={{ textAlign: 'left', marginBottom: '2rem', fontFamily: "Kanit" }}>
      Simplify your job search and achieve your career goals with JobConnect today.
    </Typography>

    <Button variant="contained" component={Link} to="/signup" sx={{ marginBottom: '1rem', backgroundColor: '#8C52FF' }}>
      Sign Up Here
    </Button>

    <Typography variant="body2" sx={{ marginBottom: '0.5rem', fontFamily: "Kanit",}}>
      Already have an account?
    </Typography>
    <Button variant="text" component={Link} to="/login" sx={{ color: '#8C52FF' }}>
      Log In here
    </Button>
  </Box>

  <img
    src="/icon (14).svg"
    alt="Image"
    style={{ width: '500px', margin: '2%', marginRight: '5%', borderRadius: '10px' }}
  />
</Box>
</div>

      );
  }

  export default HomePage;