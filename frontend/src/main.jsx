import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

//react router
import { createBrowserRouter, RouterProvider } from "react-router";

// store redux
import { Provider } from "react-redux";
import store from "./store/store.js";

// css
import "./index.css";

// pages
import App from "./App.jsx";
import Healthcheck from "./pages/healthcheck/Healthcheck.jsx";
import {
  Profile,
  SignUp,
  AuthOutlet,
  Login,
  ChangePassword,
} from "./pages/authentication/index.js";
import Home from "./pages/HomePage/Home.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
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
      {
        path: "changepassword",
        element: <ChangePassword />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
