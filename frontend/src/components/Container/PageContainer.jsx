import React from "react";
import Footer from "../Footer/Footer.jsx";
import NavbarUser from "../Header/NavbarUser.jsx";
import { useSelector } from "react-redux";
import NavbarSeller from "../Header/NavbarSeller.jsx";
import Navbar from "../Header/Navbar.jsx";

function PageContainer({ children }) {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const userRole = useSelector((state) => state.auth.role);
  return (
    <div className="main">
      <div className=" h-[9%] w-full sticky">
        {isLogin ? (
          userRole === "user" ? (
            <NavbarUser />
          ) : (
            <NavbarSeller />
          )
        ) : (
          <Navbar />
        )}
      </div>
      <div className="w-full min-h-[91%] h-[91%] ">{children}</div>
      <div className="w-full sticky">{isLogin && <Footer />}</div>
    </div>
  );
}

export default PageContainer;
