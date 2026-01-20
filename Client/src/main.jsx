import React from "react";
import router from "./app/routes.jsx"
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./styles/main.css";
import { setupAuthInterceptor } from "./lib/http/authInterceptor.js";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";

setupAuthInterceptor();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);