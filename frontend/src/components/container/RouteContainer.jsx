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

  return (
    <>
      {auth || role.length !== 0 ? (
        <div className="w-full min-h-screen h-screen">
          <div className="bg-(--primary)  flex items-center justify-center h-[9%] gap-10">
            {role === "seller" ? <NavbarSeller /> : <NavbarCustomer />}
          </div>
          {children}
          <div className=" p-10 bg-(--footer) text-white ">
            <p>this is footer</p>
          </div>
        </div>
      ) : (
        <div className="h-screen w-full">{children}</div>
      )}
    </>
  );
}

export default RouteContainer;
