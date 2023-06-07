import { useState, useEffect, useContext } from "react";
import axios from "axios";
import MovableItem from "../Components/MovableItem";
import Column from "../Components/Column";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/auth.context";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const API_URL = "http://localhost:5005/api";

function JobListPage() {
  const { user } = useContext(AuthContext);

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  const returnItemsForColumn = (columnName) => {
    return jobs
      .filter((item) => item.column === columnName)
      .map((item, index) => (
        <MovableItem
          key={item._id}
          item={item}
          name={item.title}
          currentColumnName={item.column}
          setItems={setJobs}
          index={index}
          jobs={jobs}
        />
      ));
  };

  // Axios request to query the jobs that belong to the user in context
  const getAllJobs = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");

      const response = await axios.get(`${API_URL}/jobs`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      setJobs(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  // Query to display applications within the platform
  const displayApplications = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");

      const response = await axios.get(`${API_URL}/myapplications`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      setApplications(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      getAllJobs();
      displayApplications();
    }
  }, [user]);

  return (
    <>
      <div className="container">
        <DndProvider backend={HTML5Backend}>
          <Column title={"Saved"} className="column do-it-column">
            {jobs ? returnItemsForColumn("Saved") : null}
            <Link to="/addjob">
              <button className="add-job-btn">+</button>
            </Link>
          </Column>
          <Column title={"Applied"} className="column in-progress-column">
            {jobs ? returnItemsForColumn("Applied") : null}
          </Column>
          <Column title={"Pending"} className="column awaiting-review-column">
            {jobs ? returnItemsForColumn("Pending") : null}
          </Column>
        </DndProvider>
      </div>

      <div className="container">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="right">Company name</TableCell>
                <TableCell align="right">URL</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applications.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.job.title}
                  </TableCell>
                  <TableCell align="right">{row.job.companyName}</TableCell>
                  <TableCell align="right">{row.job.jobURL}</TableCell>
                  <TableCell align="right">{row.job.description}</TableCell>
                  <TableCell align="right">{row.column}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default JobListPage;
