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
      </div>
      );
  }

  export default HomePage;

  