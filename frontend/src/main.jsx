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
import Home from "./pages/HomePage/Home.jsx";
import Healthcheck from "./pages/healthcheck/Healthcheck.jsx";
import {
  SignUp,
  Login,
  ChangePassword,
  RegistrationForm,
  Loginotp,
} from "./pages/authentication/index.js";
import {
  ProfileOutlet,
  PersonalDetails,
  Address,
} from "./pages/Profile/index.js";
import AuthContainer from "./components/AuthContainer.jsx";
import PageContainer from "./components/PageContainer.jsx";
import MainContainer from "./components/MainContainer.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/health-check",
        element: <Healthcheck />,
      },
      {
        path: "/login",
        element: (
          <AuthContainer authentication={false}>
            <Login />
          </AuthContainer>
        ),
      },
      {
        path: "/loginotp",
        element: (
          <AuthContainer authentication={false}>
            <Loginotp />
          </AuthContainer>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthContainer authentication={false}>
            <SignUp />
          </AuthContainer>
        ),
      },
      {
        path: "/change-password",
        element: (
          <AuthContainer authentication>
            <ChangePassword />
          </AuthContainer>
        ),
      },
      {
        path: "/user",
        element: (
          <AuthContainer authentication>
            <ProfileOutlet />
          </AuthContainer>
        ),
        children: [
          {
            path: "",
            element: (
              <AuthContainer authentication>
                <PersonalDetails />
              </AuthContainer>
            ),
          },
          {
            path: "address",
            element: (
              <AuthContainer authentication>
                <Address />
              </AuthContainer>
            ),
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
