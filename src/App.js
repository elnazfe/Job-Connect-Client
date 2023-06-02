// App.js

import "./App.css";

import { Routes, Route } from "react-router-dom";
 
import Navbar from "./Components/Navbar";
import HomePage from "./Pages/HomePage";
import SignUpPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import UserDashboardPage from "./Pages/UserDashboardPage"

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>      
        <Route path="/" element={ <HomePage /> } />
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/dashboard" element={<UserDashboardPage/>}/>
      </Routes>

    </div>
  );
}
export default App;
