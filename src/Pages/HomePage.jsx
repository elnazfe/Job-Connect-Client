import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/auth.context";

function HomePage() {
  const { user, authenticateUser } = useContext(AuthContext);

  useEffect(() => {
    authenticateUser();
  }, []);

    return (
      <div>
        <h1>Home Page</h1>

        <Link to="/signup">
          Sign Up here
        </Link>

        <Link to="/login">
          Log In here
        </Link>
      </div>
      );
  }

  export default HomePage;
  