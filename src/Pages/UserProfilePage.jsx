import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import { styled } from "@mui/material/styles";
import { Grid, Box, Paper, Typography } from '@mui/material';

const API_URL = process.env.REACT_APP_SERVER_URL;

function UserProfilePage() {
  const [user, setUser] = useState(null);
  const [jobseeker, setJobseeker] = useState(false);
  const [recruiter, setRecruiter] = useState(false);
  const { id } = useParams();

  const getUser = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");

      let response = await axios.get(`${API_URL}/api/profile/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      setUser(response.data);

      if (response.data.userType === "JobSeeker") {
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
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));


  // MUI

  

  return (
    <div>
      {jobseeker && (
        <>
          <Box
            sx={{
              width: "80%",
              display: "flex",
              justifyContent: "center",
              margin:  "auto",
              fontFamily: "Kanit",
            }}
          >
            <Grid container spacing={2}>

            <Grid item xs={12} sm={6} md={4}>
                <h1>Hello, Jobseeker 
                  <br/>
                  {user.firstName} {user.lastName}</h1>
                <Box display="flex" alignItems="center">
                <img
                  src={user.profileImg}
                  alt="Profile"
                  style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                />
                <Box ml={2}>
                  <h3 variant="body1">Logged in with: 
                  <br/>
                  {user.email}</h3>
                  <h4 variant="body1">City: {user.address}</h4>
                </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Item sx={{ bgcolor: "#EF601E" }}>
                  <Link to={`/profile/${user._id}/edit`}>
                  <Typography fontFamily= "Kanit" variant="h5" underline="none">Edit Your Profile</Typography>
                    <img src="/icon (10).svg" alt="Image" style={{ width: "100%", height: "auto" }} />
                  </Link>
                </Item>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Item sx={{ bgcolor: "#D6E8F7" }}>
                  <Link to={`/jobs`}>
                    <Typography fontFamily= "Kanit" variant="h5">Job Dashboard</Typography>
                    <img src="/icon (14).svg" alt="Image" style={{ width: "100%", height: "auto" }} />
                  </Link>
                </Item>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Item sx={{ bgcolor: "#CB962E" }}>
                <Link to={`/appliedjobs`}>
                    <Typography fontFamily= "Kanit" variant="h5">Applied Jobs Status</Typography>
                    <img src="/icon (12).svg" alt="Image" style={{ width: "100%", height: "auto" }} />
                  </Link>
                </Item>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Item sx={{ bgcolor: "#D6E8F7" }}>
                <Link to={`/availablejobs`}>
                    <Typography fontFamily= "Kanit" variant="h5">Available Jobs</Typography>
                    <img src="/icon (11).svg" alt="Image" style={{ width: "100%", height: "auto" }} />
                  </Link>
                </Item>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Item sx={{ bgcolor: "#CAAACD" }}>
                <Link to={`/aboutus`}>
                    <Typography fontFamily= "Kanit" variant="h5">About Us</Typography>
                    <img src="/icon (13).svg" alt="Image" style={{ width: "100%", height: "auto" }} />
                  </Link>
                </Item>
              </Grid>

            </Grid>
          </Box>
        </>
      )}

      {recruiter && (
        <>
          <Box
            sx={{
              width: "80%",
              display: "flex",
              justifyContent: "center",
              margin:  "auto",
              fontFamily: "Kanit",
            }}
          >
            <Grid container spacing={2}>

            <Grid item xs={12} sm={6} md={4}>
                <h1>Hello, Recruiter 
                  <br/>
                  {user.firstName} {user.lastName}</h1>
                <Box display="flex" alignItems="center">
                <img
                  src={user.profileImg}
                  alt="Profile"
                  style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                />
                <Box ml={2}>
                  <h3 variant="body1">Logged in with: 
                  <br/>
                  {user.email}</h3>
                  <h4 variant="body1">City: {user.address}</h4>
                </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Item sx={{ bgcolor: "#EF601E" }}>
                  <Link to={`/profile/${user._id}/edit`}>
                  <Typography fontFamily= "Kanit" variant="h5" underline="none">Edit Your Profile</Typography>
                    <img src="/icon (10).svg" alt="Image" style={{ width: "100%", height: "auto" }} />
                  </Link>
                </Item>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Item sx={{ bgcolor: "#D6E8F7" }}>
                  <Link to={`/Recruiter`}>
                    <Typography fontFamily= "Kanit" variant="h5">Job Dashboard</Typography>
                    <img src="/icon (16).svg" alt="Image" style={{ width: "100%", height: "auto" }} />
                  </Link>
                </Item>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Item sx={{ bgcolor: "#CB962E" }}>
                <Link to={`/jobpost`}>
                    <Typography fontFamily= "Kanit" variant="h5">Post a Job</Typography>
                    <img src="/icon (12).svg" alt="Image" style={{ width: "100%", height: "auto" }} />
                  </Link>
                </Item>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Item sx={{ bgcolor: "#D6E8F7" }}>
                <Link to={`/availablejobs`}>
                    <Typography fontFamily= "Kanit" variant="h5">Available Jobs</Typography>
                    <img src="/icon (11).svg" alt="Image" style={{ width: "100%", height: "auto" }} />
                  </Link>
                </Item>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Item sx={{ bgcolor: "#CAAACD" }}>
                <Link to={`/aboutus`}>
                    <Typography fontFamily= "Kanit" variant="h5">About Us</Typography>
                    <img src="/icon (13).svg" alt="Image" style={{ width: "100%", height: "auto" }} />
                  </Link>
                </Item>
              </Grid>

            </Grid>
          </Box>
        </>
      )}
    </div>
  );
}

export default UserProfilePage;
