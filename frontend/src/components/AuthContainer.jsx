import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function AuthContainer({ children, authentication = true }) {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const navigate = useNavigate();

  useEffect(() => {
    if (authentication && isLogin !== authentication) {
      navigate("/login");
    } else if (!authentication && isLogin !== authentication) {
      navigate("/");
    }
  }, [authentication, isLogin, navigate]);

  return <>{children}</>;
}

export default AuthContainer;
