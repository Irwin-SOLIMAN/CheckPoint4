import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Connexion from "./pages/Connexion";
import Todolist from "./pages/Todolist";
import "./style/index.scss";
import ProtectedRoute from "./components/ProtectedRoute";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Connexion />,
      },
      {
        path: "todolist",
        element: (
          <ProtectedRoute>
            <Todolist />,
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
