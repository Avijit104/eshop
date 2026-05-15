import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function RouteContainer({ children, auth = true, role }) {
  const navigate = useNavigate();

  const isLogin = useSelector((state) => state.auth.isLogin);

  useEffect(() => {
    if (auth && !isLogin) {
      if (role === "user") {
        navigate("/user");
      } else if (role === "seller") {
        navigate("/seller");
      }
    } else if (!auth && isLogin) {
      if (role !== "user") {
        navigate("/");
      } else if (role !== "seller") {
        navigate("/seller/dashboard");
      }
    }
  }, [isLogin, navigate, auth]);

  return <>{children}</>;
}

export default RouteContainer;
