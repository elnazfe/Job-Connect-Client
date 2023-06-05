import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleUserType = (e) => {
    setUserType(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, userType };

    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        const errorDescription = err.response.data.message;
        setErrorMessage(errorDescription);
        console.log(err);
      });
  };

  return (
    <div>
      <div>
        <h1>Signup</h1>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <div>
              <label htmlFor="userType">User Type*</label>
            </div>
            <div>
              <input
                type="radio"
                label="JobSeeker"
                value="JobSeeker"
                name="userType"
                onClick={handleUserType}
              />
              <label htmlFor="JobSeeker">Job Seeker</label>

              <input
                type="radio"
                label="Recruiter"
                value="Recruiter"
                name="userType"
                onClick={handleUserType}
              />
              <label htmlFor="needful">Recruiter</label>
            </div>
          </fieldset>

          <label htmlFor="email">Email address*</label>
          <input
            type="email"
            placeholder="example@email.com"
            value={email}
            name="email"
            onChange={handleEmail}
          />

          <label htmlFor="password">Password*</label>
          <input
            type="password"
            value={password}
            name="password"
            onChange={handlePassword}
          />
          <button type="submit">
            Sign Up
          </button>
          <p>Already have an account?</p>
          <Link to="/login">
            Log in here
          </Link>
        </form>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  );
}

export default SignUpPage;

