import { useState, useEffect, useContext } from "react";
import axios from "axios";
import MovableItem from "../Components/MovableItem";
import Column from "../Components/Column";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/auth.context";
import { COLUMN_NAMES } from "../constants";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { hover } from "@testing-library/user-event/dist/hover";

const { SAVED_JOBS } = COLUMN_NAMES;

const API_URL = "http://localhost:5005/api";

function JobListPage() {
  const { user } = useContext(AuthContext);

  console.log(user);
  const [jobs, setJobs] = useState([]);

  console.log(user);
  // useEffect(() => {
  //   if (user) {
  //     setItems(user.bookmark);
  //   }
  // }, [user]);

  /*const moveCardHandler = (dragIndex, hoverIndex) => {
    const dragItem = items[dragIndex];

    if (dragItem) {
      setItems((prevState) => {
        const coppiedStateArray = [...prevState];

        // remove item by "hoverIndex" and put "dragItem" instead
        const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);

        // remove item by "dragIndex" and put "prevItem" instead
        coppiedStateArray.splice(dragIndex, 1, prevItem[0]);

        return coppiedStateArray;
      });
    }
  };*/

  const returnItemsForColumn = (columnName) => {
    return jobs
      .filter((item) => item.column === columnName)
      .map((item, index) => (
        <MovableItem
          key={item._id}
          name={item.title}
          description={item.description}
          currentColumnName={item.column}
          // setItems={setItems}
          index={index}
          //moveCardHandler={moveCardHandler}
        />
      ));
  };

  const getAllJobs = async () => {
    try {
      const response = await axios.get(`${API_URL}/jobs/${user._id}`);
      setJobs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) getAllJobs();
  }, [user]);

  console.log({ jobs });
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
