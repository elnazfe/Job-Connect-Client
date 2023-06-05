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

const API_URL = "http://localhost:5005";

function JobListPage() {
  const [items, setItems] = useState(null);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      setItems(user.bookmark);
    }
  }, [user]);

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
    return items
      .filter((item) => item.column === columnName)
      .map((item, index) => (
        <MovableItem
          key={item._id}
          name={item.title}
          description={item.description}
          currentColumnName={item.column}
          setItems={setItems}
          index={index}
          //moveCardHandler={moveCardHandler}
        />
      ));
  };

  const { SAVED_JOBS, APPLIED_JOBS, AWAITING_INFO } = COLUMN_NAMES;

  // const [jobs, setJobs] = useState([]);

  // const getAllJobs = async () => {
  //   try {
  //     const response = await axios.get(`${API_URL}/jobs`);
  //     setJobs(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getAllJobs();
  // }, []);

  return (
    <div className="container">
      <DndProvider backend={HTML5Backend}>
        <Column title={"Saved"} className="column do-it-column">
          {items ? returnItemsForColumn("Saved") : null}
        </Column>
        <Column title={"Applied"} className="column in-progress-column">
          {items ? returnItemsForColumn("Applied") : null}
        </Column>
        <Column title={"Pending"} className="column awaiting-review-column">
          {items ? returnItemsForColumn("Pending") : null}
        </Column>
      </DndProvider>
      <Link to="/addjob">
        <button>Add a Job</button>
      </Link>
    </div>
  );
}

export default JobListPage;