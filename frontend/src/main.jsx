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
import SellerOutlet from "./pages/Seller/SellerOutlet.jsx";

import {
  LoginSeller,
  SignupSeller,
  BusinessSignup,
  SellerHome,
} from "./pages/Seller/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <RouteContainer auth={false} role={["user"]}>
            <HomePage />
          </RouteContainer>
        ),
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
              <RouteContainer auth={false} role={[]}>
                <Login />
              </RouteContainer>
            ),
          },
          {
            path: "signup",
            element: (
              <RouteContainer auth={false} role={[]}>
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
            element: (
              <RouteContainer auth role={["user"]}>
                <ProfileOutlet />
              </RouteContainer>
            ),
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
      {
        path: "seller",
        element: <SellerOutlet />,
        children: [
          {
            path: "",
            element: (
              // <RouteContainer auth={false} role={["seller"]}>
              <SellerHome />
              // </RouteContainer>
            ),
          },
          {
            path: "login",
            element: (
              <RouteContainer auth={false} role={["seller"]}>
                <LoginSeller />
              </RouteContainer>
            ),
          },
          {
            path: "signup",
            element: (
              <RouteContainer auth={false} role={["seller"]}>
                <SignupSeller />
              </RouteContainer>
            ),
          },
          {
            path: "business",
            element: (
              <RouteContainer auth role={["user"]}>
                <BusinessSignup />
              </RouteContainer>
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
