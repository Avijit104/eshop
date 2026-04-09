import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Healthcheck from "./pages/healthcheck/Healthcheck.jsx";

import {
  Profile,
  SignUp,
  AuthOutlet,
  Login,
} from "./pages/authentication/index.js";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/health-check",
    element: <Healthcheck />,
  },
  {
    path: "/user",
    element: <AuthOutlet />,
    children: [
      {
        path: "",
        element: <Profile />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
