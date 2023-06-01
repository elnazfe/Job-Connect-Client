// App.js

import "./App.css";

import { Routes, Route } from "react-router-dom";
 
import Navbar from "./Components/Navbar";
import HomePage from "./Pages/HomePage";

function App() {
  return (
    <div className="App">
      <Navbar />
 
      <Routes>      
        <Route path="/" element={ <HomePage /> } />
      </Routes>

    </div>
  );
}
export default App;
