// src/components/AddJob.jsx

import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Context/auth.context";
import { Navigate, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005";

function AddEmployee(props) {
  const [jobPosition, setJobPosition] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedToken = localStorage.getItem("authToken");

    const requestBody = {
      jobPosition,
      employeeName,
      description,
      notes,
      user,
    };

    axios
      .post(`${API_URL}/api/recruiter/add`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setJobPosition("");
        setEmployeeName("");
        setDescription("");
        setNotes("");
      })
      .catch((error) => console.log(error));

    navigate(`/recruiter`);
  };

  return (
    <div>
      <h3>List of Employee</h3>
      <form onSubmit={handleSubmit}>
        <label>jobPosition:</label>
        <input
          type="text"
          name="job Position"
          value={jobPosition}
          onChange={(e) => setJobPosition(e.target.value)}
        />

        <label>Employee Name:</label>
        <textarea
          type="text"
          name="Employee Name"
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddEmployee;
