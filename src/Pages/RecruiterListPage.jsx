import { useState, useEffect, useContext } from "react";
import axios from "axios";
import MovableItemRec from "../Components/MovableItemRec";
import ColumnRec from "../Components/ColumnRec";
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

const API_URL = process.env.REACT_APP_SERVER_URL;

function RecruiterListPage() {
  const { user } = useContext(AuthContext);

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  const returnItemsForColumn = (columnName) => {
    return applications
      .filter((item) => item.column === columnName)
      .map((item, index) => (
        <MovableItemRec
          key={item._id}
          item={item}
          currentColumnName={item.column}
          setItems={setApplications}
          index={index}
          applications={applications}
        />
      ));
  };

  const getAllApplications = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");

      const response = await axios.get(`${API_URL}/api/application`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      setApplications(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Axios request to query the jobs that belong to the user in context
  const getAllJobs = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");

      const response = await axios.get(`${API_URL}/api/jobs`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      setJobs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const CloseJob = async (job) => {
    try {
      const storedToken = localStorage.getItem("authToken");

      await axios.put(
        `${API_URL}/api/jobs/${job._id}`,
        {
          ...job,
          status: "closed",
        },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );

      const newState = jobs.map((obj) => {
        if (obj._id === job._id) {
          return { ...obj, status: "closed" };
        }

        return obj;
      });

      setJobs(newState);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      getAllJobs();
      getAllApplications();
    }
  }, [user]);

  return (
    <>
      <div className="container">
        <DndProvider backend={HTML5Backend}>
          <ColumnRec title={"Received"} className="column do-it-column">
            {applications ? returnItemsForColumn("Received") : null}
          </ColumnRec>
          <ColumnRec title={"Approved"} className="column in-progress-column">
            {applications ? returnItemsForColumn("Approved") : null}
          </ColumnRec>
          <ColumnRec title={"Interview"} className="column in-progress-column ">
            {applications ? returnItemsForColumn("Interview") : null}
          </ColumnRec>
          <ColumnRec
            title={"Rejected"}
            className="column awaiting-review-column"
          >
            {applications ? returnItemsForColumn("Rejected") : null}
          </ColumnRec>
        </DndProvider>
      </div>

      <div className="container">
        <Link to="/addnewjob">
          <button>Post a new job</button>
        </Link>
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
                <TableCell align="right">Notes</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobs.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                  <TableCell align="right">{row.jobURL}</TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                  <TableCell align="right">{row.notes}</TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                  <TableCell align="right">
                    {row.status === "open" && (
                      <button onClick={() => CloseJob(row)}>Close job</button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default RecruiterListPage;
