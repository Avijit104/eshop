import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { createBrowserRouter } from "react-router-dom";
import store from "./store/store.js";

import {
  CustomerOutlet,
  HomePage,
  Login,
  LoginOtp,
  Signup,
} from "./pages/Customer/index.js";
import HealthCheck from "./pages/HealthCheck/HealthCheck.jsx";
import ChangePassword from "./pages/ChangePassword/ChangePassword.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "health-check",
        element: <HealthCheck />,
      },
      {
        path: "user",
        element: <CustomerOutlet />,
        children: [
          {
            path: "",
            element: <Login />,
          },
          {
            path: "signup",
            element: <Signup />,
          },
          {
            path: "login-otp",
            element: <LoginOtp />,
          },
          {
            path: "change-password",
            element: <ChangePassword />,
          },
        ],
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
