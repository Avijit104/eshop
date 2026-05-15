import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function RouteContainer({ children, auth = true, role }) {
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.auth.isLogin);
  const userRole = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (auth) {
      if (!isLogin) {
        navigate(`${role === "user" ? "/user" : "/seller"}`);
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

  return <>{children}</>;
}

export default RouteContainer;
