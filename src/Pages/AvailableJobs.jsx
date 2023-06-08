import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/auth.context";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_SERVER_URL;

const AvailableJobs = () => {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const [availableJobs, setAvailableJobs] = useState();

  // using axios to get all available jobs

  const getAllJobs = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");

      const response = await axios.get(`${API_URL}/api/jobs/available`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      setAvailableJobs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const FollowLink = (url) => window.open(url); //  open a new window with the specified URL and name

  const Apply = (job) => {
    const storedToken = localStorage.getItem("authToken");

    const requestBody = {
      jobId: job._id,
    };

    // to get the jobs that are available and user applied
    axios
      .post(`${API_URL}/application/apply`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        const newState = availableJobs.map((obj) => {
          if (obj._id === job._id) {
            return { ...obj, applied: true };
          }

          return obj;
        });

        setAvailableJobs(newState);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (user) getAllJobs();
  }, [user]);

  //display the jobs with criterias
  return (
    <>
      {availableJobs &&
        availableJobs.map((job) => (
          <div key={job._id} className="container">
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {job.title}
                </Typography>
                <Typography variant="h5" component="div">
                  {job.companyName}
                </Typography>
                <Typography variant="body2">{job.description}</Typography>
              </CardContent>
              <CardActions>
                <Button onClick={() => FollowLink(job.jobURL)} size="small">
                  Learn More
                </Button>
                {!job.applied && (
                  <Button onClick={() => Apply(job)} size="small">
                    Apply
                  </Button>
                )}
              </CardActions>
            </Card>
          </div>
        ))}
    </>
  );
};

export default AvailableJobs;
