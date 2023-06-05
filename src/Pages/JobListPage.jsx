import { useState, useEffect } from "react";
import axios from "axios";
import MovableItem from "../Components/MovableItem";
import Column from "../Components/Column";
import { tasks } from "../tasks";
import { COLUMN_NAMES } from "../constants";
import { Button } from "@mui/material";

const API_URL = "http://localhost:5005";

function JobListPage() {
  const [items, setItems] = useState(tasks);

  const moveCardHandler = (dragIndex, hoverIndex) => {
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
  };

  const returnItemsForColumn = (columnName) => {
    return items
      .filter((item) => item.column === columnName)
      .map((item, index) => (
        <MovableItem
          key={item.id}
          name={item.name}
          currentColumnName={item.column}
          setItems={setItems}
          index={index}
          moveCardHandler={moveCardHandler}
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
      <Column title={SAVED_JOBS} className="column do-it-column">
        {returnItemsForColumn(SAVED_JOBS)}
      </Column>
      <Column title={APPLIED_JOBS} className="column in-progress-column">
        {returnItemsForColumn(APPLIED_JOBS)}
      </Column>
      <Column title={AWAITING_INFO} className="column awaiting-review-column">
        {returnItemsForColumn(AWAITING_INFO)}
        <Button type="submit">remove</Button>
      </Column>
    </div>
  );
}

export default JobListPage;
