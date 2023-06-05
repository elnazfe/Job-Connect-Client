// src/components/AddJob.jsx

import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Context/auth.context";
import { Navigate, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005";

function AddJob(props) {
  const [title, setTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobURL, setJobURL] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
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
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddJob;
