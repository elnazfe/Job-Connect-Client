import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/auth.context';
import axios from 'axios';

const API_URL = "http://localhost:5005"

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const body = {
      email,
      password,
    };
    axios
      .post(`${API_URL}/auth/login`, body)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate('/dashboard');
      })
      .catch((err) => {
        setErrorMessage(err.response.data.errorMessage);
      });
  };

  return (
    <div>
      <div>
        <h1>Login </h1>
        <form onSubmit={handleLoginSubmit}>
          <label>Email address*</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
          />

          <label>Password*</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
          />

          <button type="submit">
            Log in
          </button>
          <p>Don't have an account yet?</p>
          <Link to={'/signup'}>
            Sign Up here
          </Link>
        </form>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  );
}

export default LoginPage;