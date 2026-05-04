import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function AuthContainer({ children, authentication = true }) {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const navigate = useNavigate();

  console.log("this is isLogin", isLogin);
  console.log("this is authentication", authentication);

  useEffect(() => {
    console.log("this is auth container");
    if (authentication && isLogin !== authentication) {
      navigate("/login");
    } else if (!authentication && isLogin !== authentication) {
      navigate("/");
    } else {
      console.log("this is else portion");
    }
  }, [authentication, isLogin, navigate]);

  return <>{children}</>;
}

export default AuthContainer;
