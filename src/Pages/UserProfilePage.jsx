import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

const API_URL = "http://localhost:5005";

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
      console.log(response.data);

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

  return (
    <div>
      {jobseeker && (
        <>
          <Box
            sx={{
              width: "80%",
              display: "flex",
              justifyContent: "center",
              margin: "5% auto",
              fontFamily: "Kanit",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <h1>Hello, Jobseeker {user.firstName}</h1>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Item>
                  <img src="/icon.svg" alt="Image" style={{ width: "50%" }} />
                  <br />
                  <Link to={`/jobs`}>Dashboard</Link>
                </Item>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Item>
                  <img
                    src="/icon (1).svg"
                    alt="Image"
                    style={{ width: "50%" }}
                  />
                  <br />
                  <Link to={`/profile/${user._id}/detail`}>Your Profile</Link>
                </Item>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Item>
                  <img
                    src="/icon (2).svg"
                    alt="Image"
                    style={{ width: "50%" }}
                  />
                  <br />
                  <Link to={`/profile/${user._id}/edit`}>
                    Edit Your Profile
                  </Link>
                </Item>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Item>5</Item>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Item>6</Item>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Item>7</Item>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Item>8</Item>
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
              margin: "5% auto",
              fontFamily: "Kanit",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <h1>Hello, Recruiter {user.firstName}</h1>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Item>
                  <img src="/icon.svg" alt="Image" style={{ width: "50%" }} />
                  <br />
                  <Link to={`/Recruiter`}>Dashboard</Link>
                </Item>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Item>
                  <img
                    src="/icon (1).svg"
                    alt="Image"
                    style={{ width: "50%" }}
                  />
                  <br />
                  <Link to={`/profile/${user._id}/detail`}>Your Profile</Link>
                </Item>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Item>
                  <img
                    src="/icon (2).svg"
                    alt="Image"
                    style={{ width: "50%" }}
                  />
                  <br />
                  <Link to={`/profile/${user._id}/edit`}>
                    Edit Your Profile
                  </Link>
                </Item>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Item>5</Item>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Item>6</Item>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Item>7</Item>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Item>8</Item>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </div>
  );
}

export default UserProfilePage;
