import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <GoogleOAuthProvider clientId="15877721482-pq3p1u0krk7v9hn87einickmqnejsq6i.apps.googleusercontent.com">
    <BrowserRouter>
      <App />
    </BrowserRouter>
 </GoogleOAuthProvider>
  
);
