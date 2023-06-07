// src/components/AddJob.jsx

import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Context/auth.context";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005";

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

    navigate(`/recruiter`);
  };

  return (
    <div>
      <h3>Post a new job</h3>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label>Company Name:</label>
        <input
          type="text"
          name="Company name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <br />
        <label>URL:</label>
        <input
          type="text"
          name="URL"
          value={jobURL}
          onChange={(e) => setJobURL(e.target.value)}
        />

        <br />
        <label>Description:</label>
        <textarea
          type="text"
          name="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <br />
        <label>Notes:</label>
        <textarea
          type="text"
          name="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddNewJob;
