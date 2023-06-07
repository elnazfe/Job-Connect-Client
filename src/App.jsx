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
import ProfileDetailPage from "./Pages/ProfileDetailPage";
import EmployeeListPage from "./Pages/EmployeeListPage";
import AddEmployeePage from "./Pages/AddEmployeePage"
import ComingSoon from "./Pages/ComingSoon";


import { useContext } from "react";
import { AuthContext } from "./Context/auth.context";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />

        {user && (
          <>
            <Route path="/profile/:id" element={<UserProfilePage />} />
            <Route path="/profile/:id/edit" element={<EditProfilePage />} />
            <Route path="/profile/:id/detail" element={<ProfileDetailPage />} />
            <Route path="/jobs" element={<JobListPage />} />
            <Route path="/recruiter" element={<EmployeeListPage/>} />
            <Route path="/addjob" element={<AddJob />} />
            <Route path="/jobdetail" element={<JobDetailPage />} />
            <Route path="/addemployee" element={<AddEmployeePage />} />
            <Route path="/comingsoon" element={<ComingSoon />} />

          </>
        )}
      </Routes>
    </div>
  );
}
export default App;
