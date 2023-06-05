import React, { useEffect } from "react";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProviderWrapper } from "./Context/auth.context";
import WebFont from "webfontloader";
import { createRoot } from "react-dom/client";

function RootComponent() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Kanit"],
      },
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

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<RootComponent />);

reportWebVitals();
