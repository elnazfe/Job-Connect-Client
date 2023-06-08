//index.jsx

import React, { useEffect } from "react";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProviderWrapper } from "./Context/auth.context";
import WebFont from "webfontloader";
import { createRoot } from "react-dom/client";

import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { StyledEngineProvider } from '@mui/material/styles';

const supabase = createClient(
  "https://gflaoudfbggrtlzsejdw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmbGFvdWRmYmdncnRsenNlamR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODYxMzM1MzgsImV4cCI6MjAwMTcwOTUzOH0.ULPQVZ9rNsXN2LtFwNs5mjDyUnpIbYMMew_HnNEEbwQ"
);

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
          <SessionContextProvider supabaseClient={supabase}>
            <StyledEngineProvider injectFirst>
              <App />
            </StyledEngineProvider>
           </SessionContextProvider>
        </AuthProviderWrapper>
      </Router>
    </React.StrictMode>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<RootComponent />);

reportWebVitals();
