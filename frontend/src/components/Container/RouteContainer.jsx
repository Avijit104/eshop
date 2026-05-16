import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function RouteContainer({ children, auth = true, role }) {
  //hookes
  const navigate = useNavigate();

  // states
  const isLogin = useSelector((state) => state.auth.isLogin);
  const userRole = useSelector((state) => state.auth.role);

  // route security
  useEffect(() => {
    if (auth) {
      if (!isLogin) {
        navigate(`${role.includes("user") ? "/user/login" : "/seller"}`);
      } else {
        if (!role.includes(userRole)) {
          navigate(`${userRole === "user" ? "/" : "/seller/dashboard"}`);
        }
      }
    } else if (!auth) {
      if (isLogin) {
        navigate(`${userRole === "user" ? "/" : "/seller/dashboard"}`);
      }
    }
  }, [isLogin, auth, role, userRole, navigate]);

  // dom
  return <>{children}</>;
}

export default RouteContainer;
