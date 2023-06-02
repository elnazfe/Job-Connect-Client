// src/components/AddJob.jsx

import { useState } from "react";
import axios from "axios";


const API_URL = "http://localhost:5005/";

function AddJob(props) {
  const [title, setTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobURL, setJobURL] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) =>{
    e.preventDefault();

    const requestBody = {title, companyName, jobURL, description, status, notes};

    axios
    .post(`${API_URL}/api/addjob`, requestBody)
    .then((response) => {
      setTitle("");
      setCompanyName("");
      setJobURL("");
      setDescription("");
      setStatus("");
      setNotes("");
    })
    .catch((error) => console.log(error));
    };


  return (
    <div>
    <h3>My Jobs</h3>
      <form>
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