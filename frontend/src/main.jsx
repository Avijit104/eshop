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
import { SignUp, Login, ChangePassword } from "./pages/authentication/index.js";
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
      {
        path: "/health-check",
        element: <Healthcheck />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
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
