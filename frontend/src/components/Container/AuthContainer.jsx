import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function AuthContainer({ children, authentication = true }) {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const userRole = useSelector((state) => state.auth.role);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authentication && isLogin !== authentication) {
      if (userRole === "user") {
        navigate("/");
      } else if (userRole === "seller") {
        navigate("/seller");
      }
    }
  }, [authentication, isLogin, navigate]);

  return <>{children}</>;
}

export default AuthContainer;
