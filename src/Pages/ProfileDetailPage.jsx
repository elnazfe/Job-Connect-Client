// ProfileDetailPage

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import { Box, Typography } from '@mui/material';


const API_URL = process.env.REACT_APP_SERVER_URL;

function Profile() {
  const [user, setUser] = useState("");
  const { id } = useParams();

  const getUser = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");

      let response = await axios.get(`${API_URL}/api/profile/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Box display="flex" alignItems="center">
    <img
      src={user.profileImg}
      alt="Profile"
      style={{ width: "100px", height: "100px", borderRadius: "50%" }}
    />
    <Box ml={2}>
      <h1 variant="h1">
        {user.firstName} {user.lastName}
      </h1>
      <h3 variant="body1">Logged in with: {user.email}</h3>
      <h4 variant="body1">Address: {user.address}</h4>
      <Link to={`/profile/${user._id}/edit`}>
        Edit Account
      </Link>
    </Box>
  </Box>
  );
}

export default Profile;
