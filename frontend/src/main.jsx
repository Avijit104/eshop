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
// entry point
import App from "./App.jsx";

// health check page
import Healthcheck from "./pages/healthcheck/Healthcheck.jsx";

// Customer pages
import {
  SignUp,
  RegistrationForm,
  Login,
  Loginotp,
  ChangePassword,
  ProfileOutlet,
  PersonalDetails,
  Address,
  CardPayment,
  GiftCard,
  Upi,
  Home,
  CustomerOutlet,
} from "./pages/Customer/index.js";

// container
import AuthContainer from "./components/Container/AuthContainer.jsx";

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
        path: "/change-password",
        element: (
          <AuthContainer authentication>
            <ChangePassword />
          </AuthContainer>
        ),
      },
      {
        path: "/user",
        element: <CustomerOutlet />,
        children: [
          {
            path: "",
            element: (
              <AuthContainer authentication={false}>
                <Login />
              </AuthContainer>
            ),
          },
          {
            path: "loginotp",
            element: (
              <AuthContainer authentication={false}>
                <Loginotp />
              </AuthContainer>
            ),
          },
          {
            path: "signup",
            element: (
              <AuthContainer authentication={false}>
                <SignUp />
              </AuthContainer>
            ),
          },
          {
            path: "profile",
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
              {
                path: "gift-card",
                element: (
                  <AuthContainer authentication>
                    <GiftCard />
                  </AuthContainer>
                ),
              },
              {
                path: "card",
                element: (
                  <AuthContainer authentication>
                    <CardPayment />
                  </AuthContainer>
                ),
              },
              {
                path: "upi",
                element: (
                  <AuthContainer authentication>
                    <Upi />
                  </AuthContainer>
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
