import React from "react";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer";
import MainContainer from "./MainContainer.jsx";

function PageContainer({ children }) {
  console.log("this is page", children);
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
