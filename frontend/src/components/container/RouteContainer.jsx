import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import NavbarCustomer from "../header/NavbarCustomer";
import NavbarSeller from "../header/NavbarSeller";

function RouteContainer({ children, auth = true, role }) {
  //hookes
  const navigate = useNavigate();

  console.log(typeof role);
  console.log(role);
  // states
  const isLogin = useSelector((state) => state.auth.isLogin);
  console.log(isLogin);
  const userRole = useSelector((state) => state.auth.role);
  console.log("this is user role", userRole);
  // route security
  useEffect(() => {
    if (auth) {
      if (!isLogin) {
        console.log(isLogin);
        console.log("this is not login but auth");
        navigate(`${role.includes("user") ? "/user" : "/seller"}`);
      } else {
        if (!role.includes(userRole) && role.length !== 0) {
          console.log("this is not user role");
          navigate(`${userRole === "user" ? "/" : "/seller/dashboard"}`);
        }
      }
    } else if (!auth) {
      if (!role.includes(userRole) && isLogin) {
        if (userRole === "user") {
          navigate("/");
        } else if (userRole === "seller") {
          navigate("/seller/dashboard");
        }
      }
    }
  }, [isLogin, auth, role, userRole, navigate]);

  return <>{children}</>;
}

export default RouteContainer;
