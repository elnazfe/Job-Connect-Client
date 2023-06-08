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

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';


const API_URL = process.env.REACT_APP_SERVER_URL;

function JobPostPage() {
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

    // MIU
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#8C52FF"),
    backgroundColor: "#8C52FF",
    '&:hover': {
      backgroundColor: "#8C52FF",
    },
  }));

  return (
    <>
            {/* <div className="container">
      <DndProvider backend={HTML5Backend}>
      <Box sx={{ flexGrow: 1,  marginTop: "20px"}}>
      <Grid container spacing={2} columns={20}>
        <Grid item xs={5}>
          <Item sx={{bgcolor: "#CED1F4"}}>
          <ColumnRec title={"Received"} className="column do-it-column">
            {applications ? returnItemsForColumn("Received") : null}
          </ColumnRec>
          </Item>
        </Grid>
        <Grid item xs={5}>
          <Item sx={{bgcolor: "#CED1F4"}}> 
          <ColumnRec title={"Approved"} className="column in-progress-column">
            {applications ? returnItemsForColumn("Approved") : null}
          </ColumnRec>
          </Item>
        </Grid>
        <Grid item xs={5}>
          <Item sx={{bgcolor: "#CED1F4"}}>
          <ColumnRec title={"Interview"} className="column in-progress-column ">
            {applications ? returnItemsForColumn("Interview") : null}
          </ColumnRec>
          </Item>
        </Grid>
        <Grid item xs={5}>
          <Item sx={{bgcolor: "#CED1F4"}}>
          <ColumnRec
            title={"Rejected"}
            className="column awaiting-review-column"
          >
            {applications ? returnItemsForColumn("Rejected") : null}
          </ColumnRec>
          </Item>
        </Grid>
    </Grid>
      <br/>

      <Link to="/addnewjob">
      <ColorButton variant="contained">Post a new job</ColorButton>
      </Link>

    </Box>
    </DndProvider>
      </div> */}

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

        <Link to="/addnewjob">
            <ColorButton variant="contained">Post a new job</ColorButton>
        </Link>

      </div>
    </>
  );
}

export default JobPostPage;
