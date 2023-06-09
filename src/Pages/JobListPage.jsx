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

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const API_URL = process.env.REACT_APP_SERVER_URL;

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

      const response = await axios.get(`${API_URL}/api/jobs`, {
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

      const response = await axios.get(`${API_URL}/api/myapplications`, {
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
      <div className="container">
      <DndProvider backend={HTML5Backend}>
      <Box sx={{ flexGrow: 1,  marginTop: "20px"}}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Item sx={{bgcolor: "#CED1F4"}}>
          <Column title={"Saved"} className="column do-it-column">
          {jobs ? returnItemsForColumn("Saved") : null}
        </Column>
          </Item>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Item sx={{bgcolor: "#CED1F4"}}> 
          <Column title={"Applied"} className="column in-progress-column">
          {jobs ? returnItemsForColumn("Applied") : null}
        </Column>
          </Item>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Item sx={{bgcolor: "#CED1F4"}}>
          <Column title={"Pending"} className="column awaiting-review-column">
          {jobs ? returnItemsForColumn("Pending") : null}
        </Column>
          </Item>
        </Grid>
      </Grid>
      <br/>
      <br/>
      <br/>
      <Link to="/addjob">
      <ColorButton align="right" variant="text" type="submit" >Add a new job to list</ColorButton>
      </Link>
    </Box>
      </DndProvider>
      </div>

      {/* <div className="container">
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
      </div> */}
    </>
  );
}

export default JobListPage;
