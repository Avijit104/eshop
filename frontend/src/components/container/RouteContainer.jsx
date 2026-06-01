import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function RouteContainer({ children, auth = true, role }) {
  //hookes
  const navigate = useNavigate();

  // states
  const isLogin = useSelector((state) => state.auth.isLogin);
  console.log(isLogin);
  const userRole = useSelector((state) => state.auth.role);

  // route security
  useEffect(() => {
    if (auth) {
      if (!isLogin) {
        console.log(isLogin);
        console.log("this is not login but auth");
        navigate(`${role.includes("user") ? "/user" : "/seller"}`);
      } else {
        if (!role.includes(userRole)) {
          console.log("this is not user role");
          navigate(`${userRole === "user" ? "/" : "/seller/dashboard"}`);
        }
      }
    } else if (!auth) {
      if (isLogin) {
        console.log("this is not auth but login");
        navigate(`${userRole === "user" ? "/" : "/seller/dashboard"}`);
      }
    }
  }, [isLogin, auth, role, userRole, navigate]);

  return <>{children}</>;
}

export default RouteContainer;
