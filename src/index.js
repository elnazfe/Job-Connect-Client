import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProviderWrapper } from "./Context/auth.context";
import WebFont from 'webfontloader';

function RootComponent() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Kanit']
      }
    });
  }, []);

  return (
    <React.StrictMode>
      <Router>
        <AuthProviderWrapper>
          <App />
        </AuthProviderWrapper>
      </Router>
    </React.StrictMode>
  );
}

ReactDOM.render(<RootComponent />, document.getElementById("root"));
reportWebVitals();