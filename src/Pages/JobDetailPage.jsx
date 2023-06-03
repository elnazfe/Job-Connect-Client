import React, { useState } from "react";

function Dashboard() {
  const [savedJobs, setSavedJobs] = useState([
    { id: 1, title: "Job 1", status: "saved" },
    { id: 2, title: "Job 2", status: "saved" },
    { id: 3, title: "Job 3", status: "saved" },
  ]);
  const [appliedJobs, setAppliedJobs] = useState([]);

  const handleDragStart = (event, jobId) => {
    event.dataTransfer.setData("jobId", jobId);
  };

  const handleDrop = (event, status) => {
    const jobId = event.dataTransfer.getData("jobId");

    // Update job status
    const updatedJobs = savedJobs.map((job) => {
      if (job.id.toString() === jobId) {
        return { ...job, status };
      }
      return job;
    });

    // Update state
    if (status === "applied") {
      setAppliedJobs([...appliedJobs, jobId]);
    }
    setSavedJobs(updatedJobs);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="dashboard">
      <div className="saved-jobs">
        <h2>Saved Jobs</h2>
        <ul>
          {savedJobs.map((job) => (
            <li
              key={job.id}
              draggable
              onDragStart={(e) => handleDragStart(e, job.id.toString())}
            >
              {job.title}
            </li>
          ))}
        </ul>
      </div>
      <div
        className="applied-jobs"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, "applied")}
      >
        <h2>Applied Jobs</h2>
        <ul>
          {appliedJobs.map((jobId) => (
            <li key={jobId}>
              {savedJobs.find((job) => job.id.toString() === jobId)?.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;