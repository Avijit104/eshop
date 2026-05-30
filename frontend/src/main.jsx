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
  PersonalDetails,
  ProfileOutlet,
  Address,
} from "./pages/Customer/index.js";
import HealthCheck from "./pages/HealthCheck/HealthCheck.jsx";
import ChangePassword from "./pages/ChangePassword/ChangePassword.jsx";
import RouteContainer from "./components/container/RouteContainer.jsx";

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
            element: (
              <RouteContainer auth={false} role={["user"]}>
                <Login />,
              </RouteContainer>
            ),
          },
          {
            path: "signup",
            element: (
              <RouteContainer auth={false} role={["user"]}>
                <Signup />
              </RouteContainer>
            ),
          },
          {
            path: "login-otp",
            element: (
              <RouteContainer auth={false} role={["user"]}>
                <LoginOtp />
              </RouteContainer>
            ),
          },
          {
            path: "change-password",
            element: (
              <RouteContainer auth role={["user"]}>
                <ChangePassword />
              </RouteContainer>
            ),
          },
          {
            path: "profile",
            element: <ProfileOutlet />,
            children: [
              {
                path: "",
                element: (
                  <RouteContainer auth role={["user"]}>
                    <PersonalDetails />
                  </RouteContainer>
                ),
              },
              {
                path: "address",
                element: (
                  <RouteContainer auth role={["user"]}>
                    <Address />
                  </RouteContainer>
                ),
              },
            ],
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
