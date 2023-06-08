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
import RecruiterListPage from "./Pages/RecruiterListPage";
import ComingSoon from "./Pages/ComingSoon";
import AddToCalendar from "./Pages/AddToCalendar";

import { useContext } from "react";
import { AuthContext } from "./Context/auth.context";
import AddNewJob from "./Pages/AddNewJobPage";
import AvailableJobs from "./Pages/AvailableJobs";
import JobPostPage from "./Pages/JobPostPage";

import AppliedJobs from "./Pages/AppliedJobs";
import Footer from "./Components/Footer";
import AboutUsPage from "./Pages/AboutUsPage";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="App">
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />

          {user && (
            <>
              <Route path="/profile/:id" element={<UserProfilePage />} />
              <Route path="/profile/:id/edit" element={<EditProfilePage />} />
              <Route
                path="/profile/:id/detail"
                element={<ProfileDetailPage />}
              />
              <Route path="/jobs" element={<JobListPage />} />
              <Route path="/recruiter" element={<RecruiterListPage />} />
              <Route path="/addjob" element={<AddJob />} />
              <Route path="/jobdetail" element={<JobDetailPage />} />
              <Route path="/jobpost" element={<JobPostPage />} />
              <Route path="/addnewjob" element={<AddNewJob />} />
              <Route path="/comingsoon" element={<ComingSoon />} />
              <Route path="/addtocalendar" element={<AddToCalendar />} />
              <Route path="/availablejobs" element={<AvailableJobs />} />
              <Route path="/appliedjobs" element={<AppliedJobs />} />
              <Route path="/aboutus" element={<AboutUsPage />} />
            </>
          )}
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
export default App;
