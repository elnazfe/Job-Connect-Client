// src/components/AddNewJob.jsx [Recruiter]

import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Context/auth.context";
import { useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { Box, TextField, Button } from '@mui/material';

const API_URL = process.env.REACT_APP_SERVER_URL;

function AddNewJob(props) {
  const [title, setTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobURL, setJobURL] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedToken = localStorage.getItem("authToken");

    const requestBody = {
      title,
      companyName,
      jobURL,
      description,
      notes,
      user,
      type: "recruiter",
    };

    axios
      .post(`${API_URL}/api/jobs/addjob`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        setTitle("");
        setCompanyName("");
        setJobURL("");
        setDescription("");
        setNotes("");
      })
      .catch((error) => console.log(error));

    navigate(`/jobpost`);
  };

  return (
   

    <div>
      <h3>Post a new job</h3>
      <form onSubmit={handleSubmit}>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { marginBottom: '10px' },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              label="Title"
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <TextField
              label="Company Name"
              type="text"
              name="title"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          <div>
            <TextField
              label="URL"
              type="text"
              name="title"
              value={jobURL}
              onChange={(e) => setJobURL(e.target.value)}
            />
          </div>
          <div>
            <TextField
              label="Description"
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </Box>
        <br />
        <Button variant="text" type="submit" style={{ marginTop: '10px' }}>
          Submit
        </Button>
      </form>
    </div>
    

  );
}

export default AddNewJob;
