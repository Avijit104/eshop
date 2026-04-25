import React from "react";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer";

function PageContainer({ children }) {
  return (
    <div className="main">
      <Navbar />
      <>{children}</>
      <Footer />
    </div>
  );
}

export default PageContainer;
