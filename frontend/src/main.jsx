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

//seller
import {
  SellerLogin,
  SellerRegistration,
  SellerOutlet,
  BusinessRegistration,
  Dashboard,
  SellerProfile,
  DashboardOutlet,
  Inventory,
  Orders,
  AddProduct,
} from "./pages/Seller/index.js";

// container
import RouteContainer from "./components/Container/RouteContainer.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <RouteContainer auth={false} role={["user"]}>
            <Home />
          </RouteContainer>
        ),
      },
      {
        path: "/health-check",
        element: <Healthcheck />,
      },

      {
        path: "/change-password",
        element: (
          <RouteContainer auth role={["user", "seller"]}>
            <ChangePassword />
          </RouteContainer>
        ),
      },
      {
        path: "/user",
        element: <CustomerOutlet />,
        children: [
          {
            path: "login",
            element: (
              <RouteContainer auth={false} role={["user"]}>
                <Login />
              </RouteContainer>
            ),
          },
          {
            path: "loginotp",
            element: (
              <RouteContainer auth={false} role={["user"]}>
                <Loginotp />
              </RouteContainer>
            ),
          },
          {
            path: "",
            element: (
              <RouteContainer auth={false} role={["user"]}>
                <SignUp />
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
              {
                path: "gift-card",
                element: (
                  <RouteContainer auth role={["user"]}>
                    <GiftCard />
                  </RouteContainer>
                ),
              },
              {
                path: "card",
                element: (
                  <RouteContainer auth role={["user"]}>
                    <CardPayment />
                  </RouteContainer>
                ),
              },
              {
                path: "upi",
                element: (
                  <RouteContainer auth role={["user"]}>
                    <Upi />
                  </RouteContainer>
                ),
              },
            ],
          },
        ],
      },
      {
        path: "/seller",
        element: <SellerOutlet />,
        children: [
          {
            path: "",
            element: (
              <RouteContainer auth={false} role={["seller"]}>
                <SellerRegistration />
              </RouteContainer>
            ),
          },
          {
            path: "business-signup",
            element: (
              <RouteContainer auth role={["user", "seller"]}>
                <BusinessRegistration />
              </RouteContainer>
            ),
          },
          {
            path: "login",
            element: (
              <RouteContainer auth={false} role={["seller"]}>
                <SellerLogin />
              </RouteContainer>
            ),
          },
          {
            path: "dashboard",
            element: (
              <RouteContainer auth role={["seller"]}>
                <DashboardOutlet />
              </RouteContainer>
            ),
            children: [
              {
                path: "",
                element: (
                  <RouteContainer auth role={["seller"]}>
                    <Dashboard />
                  </RouteContainer>
                ),
              },
              {
                path: "profile",
                element: (
                  <RouteContainer auth role={["seller"]}>
                    <SellerProfile />
                  </RouteContainer>
                ),
              },
            ],
          },

          {
            path: "inventory",
            element: (
              <RouteContainer auth role={["seller"]}>
                <Inventory />
              </RouteContainer>
            ),
          },
          {
            path: "orders",
            element: (
              <RouteContainer auth role={["seller"]}>
                <Orders />
              </RouteContainer>
            ),
          },
          {
            path: "add-product",
            element: (
              <RouteContainer auth role={["seller"]}>
                <AddProduct />
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
