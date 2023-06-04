// App.js

import "./App.css";

import { Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import HomePage from "./Pages/HomePage";
import SignUpPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import UserProfilePage from "./Pages/UserProfilePage";
import JobListPage from "./Pages/JobListPage";
import AddJob from "./Pages/AddJobPage";
import JobDetailPage from "./Pages/JobDetailPage";
import EditProfilePage from "./Pages/EditProfilePage";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile/:id" element={<UserProfilePage />} />
          <Route path="/profile/:id/edit" element={<EditProfilePage />} />
          <Route path="/jobs" element={<JobListPage />} />
          <Route path="/addjob" element={<AddJob />} />
          <Route path="/jobdetail" element={<JobDetailPage />} />
        </Routes>
      </DndProvider>
    </div>
  );
}
export default App;
