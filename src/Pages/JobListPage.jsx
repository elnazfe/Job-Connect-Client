import { useState, useEffect, useContext } from "react";
import axios from "axios";
import MovableItem from "../Components/MovableItem";
import Column from "../Components/Column";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/auth.context";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const API_URL = "http://localhost:5005/api";

function JobListPage() {
  const { user } = useContext(AuthContext);

  const [jobs, setJobs] = useState([]);

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

  useEffect(() => {
    if (user) getAllJobs();
  }, [user]);

  return (
    <div className="container">
      <DndProvider backend={HTML5Backend}>
        <Column title={"Saved"} className="column do-it-column">
          {jobs ? returnItemsForColumn("Saved") : null}
        </Column>
        <Column title={"Applied"} className="column in-progress-column">
          {jobs ? returnItemsForColumn("Applied") : null}
        </Column>
        <Column title={"Pending"} className="column awaiting-review-column">
          {jobs ? returnItemsForColumn("Pending") : null}
        </Column>
      </DndProvider>
      <Link to="/addjob">
        <button>Add a Job</button>
      </Link>
    </div>
  );
}

export default JobListPage;
