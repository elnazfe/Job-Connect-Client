import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
 
const API_URL = "http://localhost:5005";

function UserProfilePage() {
    const [user, setUser] = useState(null);
    const [jobseeker, setJobseeker] = useState(false);
    const [recruiter, setRecruiter] = useState(false);
    const { id } = useParams();

    const getUser = async () => {
        try {
          const storedToken = localStorage.getItem('authToken');

          let response = await axios.get(`${API_URL}/api/profile/${id}`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          });

          setUser(response.data);
          console.log(response.data)

          if (response.data.userType === 'JobSeeker') {
            setJobseeker(true);
          } else {
            setRecruiter(true);
          }
        } catch (error) {
          console.log(error);
        }
      };

      useEffect(() => {
        getUser();
      }, []); 


    const Item = styled(Paper)(({ theme }) => ({
      backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    }));  

    return (
      <div>
        <Box sx={{ width: '100%' }}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid xs={3}>
            {jobseeker && (
        <> 
            <h1>
              Hello, Jobseekr
            </h1>

            <Link to={`/profile/${user._id}/edit`}>
              Profile
            </Link>

            <Link to={`/jobs`}>
              Dashboard
            </Link> 
        </>
      )}

      {recruiter && (
        <>
            <h1>
              Hello Recruiter
            </h1>

            <h2>
              Coming Soon!
            </h2>

        </>
      )}
            </Grid>
            <Grid xs={3}>
              <Item>2</Item>
            </Grid>
            <Grid xs={3}>
              <Item>3</Item>
            </Grid>
            <Grid xs={3}>
              <Item>4</Item>
            </Grid>
            <Grid xs={3}>
              <Item>5</Item>
            </Grid>
            <Grid xs={3}>
              <Item>6</Item>
            </Grid>
            <Grid xs={3}>
              <Item>7</Item>
            </Grid>
            <Grid xs={3}>
              <Item>8</Item>
            </Grid>
          </Grid>
        </Box>
      </div>
    )}


  export default UserProfilePage;
