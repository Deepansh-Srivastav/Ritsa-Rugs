import React from "react";
import router from "./app/routes.jsx"
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./styles/main.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
);