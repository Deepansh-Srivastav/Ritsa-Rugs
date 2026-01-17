import React from "react";
import router from "./app/routes.jsx"
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import "./styles/main.css";

const CLIENT_ID = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={CLIENT_ID}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </GoogleOAuthProvider>
);