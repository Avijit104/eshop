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
import { SignUp, Login, ChangePassword } from "./pages/authentication/index.js";
import {
  ProfileOutlet,
  PersonalDetails,
  Address,
} from "./pages/Profile/index.js";
import AuthContainer from "./components/AuthContainer.jsx";
import PageContainer from "./components/PageContainer.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <PageContainer>
            <Home />
          </PageContainer>
        ),
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
        path: "/signup",
        element: (
          <AuthContainer authentication={false}>
            <SignUp />
          </AuthContainer>
        ),
      },
      {
        path: "/user",
        element: (
          <PageContainer>
            <AuthContainer authentication>
              <ProfileOutlet />
            </AuthContainer>
          </PageContainer>
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
