// AddJobPage.jsx [Jobseeker]

import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Context/auth.context";
import { useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";

const API_URL = process.env.REACT_APP_SERVER_URL;

function AddJob(props) {
  const [title, setTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobURL, setJobURL] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("user");
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
      status,
      notes,
      user,
    };

    axios
      .post(`${API_URL}/api/jobs/addjob`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setTitle("");
        setCompanyName("");
        setJobURL("");
        setDescription("");
        setStatus("");
        setNotes("");
      })
      .catch((error) => console.log(error));

    navigate(`/jobs`);
  };

  return (
    <div>
      <h3>My Jobs</h3>
      <form onSubmit={handleSubmit}>
        <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
        <TextField
        
          label="Job Titile"
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        </div>
        <div>
        <TextField
        id="outlined-error"
          label="Company Name"
          type="text"
          name="title"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        </div>
        <div>
        <TextField
        id="outlined-error"
          label="Job URL"
          type="text"
          name="title"
          value={jobURL}
          onChange={(e) => setJobURL(e.target.value)}
        />
        </div>
        <div>
        <TextField
        id="outlined-error"
          label="Job Description"
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        </div>
        </Box>
        <br/>
        <Button variant="text" type="submit" className="add-button">Add Job</Button>
      </form>
    </div>
  );
}

export default AddJob;