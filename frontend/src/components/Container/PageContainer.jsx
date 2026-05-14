import React from "react";
import Navbar from "../Header/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";

function PageContainer({ children }) {
  return (
    <div className="main">
      <div className=" h-[9%] w-full sticky">
        <Navbar />
      </div>
      <div className="w-full min-h-[91%] h-[91%] ">{children}</div>
      <div className="w-full sticky">
        <Footer />
      </div>
    </div>
  );
}

export default PageContainer;
