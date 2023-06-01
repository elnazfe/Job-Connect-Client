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
    <div className="signupBody">
      <div className="signupPageB">
        <h1>Signup</h1>
        <form onSubmit={handleSubmit} className="signupForm">
          <fieldset className="fieldset">
            <div>
              <label htmlFor="userType">User Type*</label>
            </div>

            <div>
              <input
                type="radio"
                className="css-authinput"
                label="JobSeeker"
                value="JobSeeker"
                name="userType"
                onClick={handleUserType}
              />
              <label htmlFor="JobSeeker">Job Seeker</label>

              <input
                type="radio"
                className="css-authinput"
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
            className="css-authinput"
            value={email}
            name="email"
            onChange={handleEmail}
          />

          <label htmlFor="password">Password*</label>
          <input
            type="password"
            className="css-authinput"
            value={password}
            name="password"
            onChange={handlePassword}
          />
          <button className="signupBtnSubmit" type="submit">
            Sign Up
          </button>
          <p className="loginFormPhraseP">Already have an account?</p>
          <Link to="/login" className="loginLinkBtn">
            Log in here
          </Link>
        </form>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  );
}

export default SignUpPage;
