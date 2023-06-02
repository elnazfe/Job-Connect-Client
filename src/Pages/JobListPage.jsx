import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddJob from "./AddJobPage";
 
const API_URL = "http://localhost:5005";

function JobListPage() {
    const [jobs, setJobs] = useState([]);
  
    const getAllJobs = async () => {
        try {
            const response = await axios.get(`${API_URL}/jobs`);
            setJobs(response.data);
        } catch (error) {
            console.log(error);
        }
    }; 

    useEffect(() => {
        getAllJobs();
    }, []);

    return (
        <div>
            <AddJob refreshJobs={getAllJobs} />
            <div>
            {jobs.map((job) => (
                <div className="job-card" key={job._id}>
                    <Link to={`/jobs/${job._id}`}>
                        <h3>What is this</h3>
                    </Link>
                </div>
            ))}
            </div>
        </div>
    );
}

export default JobListPage;
