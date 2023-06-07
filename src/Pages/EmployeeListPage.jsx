import { useState, useEffect, useContext } from "react";
import axios from "axios";
import MovableItemRec from "../Components/MovableItemRec";
import ColumnRec from "../Components/ColumnRec";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/auth.context";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const API_URL = "http://localhost:5005/api";

function EmployeeListPage() {
  const { user } = useContext(AuthContext);

  const [employees, setEmployees] = useState([]);

  const returnItemsForColumn = (columnName) => {
    return employees
      .filter((item) => item.column === columnName)
      .map((item, index) => (
        <MovableItemRec
          key={item._id}
          item={item}
          name={item.title}
          currentColumnName={item.column}
          setItems={setEmployees}
          index={index}
          employees={employees}
        />
      ));
  };

  // Axios request to query the jobs that belong to the user in context
  const getAllEmployees = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");

      const response = await axios.get(`${API_URL}/recruiter`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      setEmployees(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) getAllEmployees();
  }, [user]);

  return (
    <div className="container">
      <DndProvider backend={HTML5Backend}>
        <ColumnRec title={"Recieved"} className="column do-it-column">
          {employees ? returnItemsForColumn("Recieved") : null}
        </ColumnRec>
        <ColumnRec title={"Rejected"} className="column in-progress-column">
          {employees ? returnItemsForColumn("Rejected") : null}
        </ColumnRec>
        <ColumnRec title={"Interview"} className="column awaiting-review-column">
          {employees ? returnItemsForColumn("Interview") : null}
        </ColumnRec>
      </DndProvider>
      <Link to="/addemployee">
        <button>Add an Employee</button>
      </Link>
    </div>
  );
}

export default EmployeeListPage;
