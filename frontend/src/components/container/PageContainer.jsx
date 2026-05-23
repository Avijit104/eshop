import React from "react";
import Logo from "../Logo";
import Navbar from "../header/Navbar";
import SideContainer from "./SideContainer";
import MainContainer from "./MainContainer";

function PageContainer({ children }) {
  return (
    <>
      <div className="w-full h-min-screen h-screen">
        <div className="bg-(--primary)  flex items-center justify-center h-[9%] gap-10">
          <Navbar />
        </div>
        <div className="bg-(--secondary) h-[91%] w-full flex justify-center items-center">
          {children}
        </div>

        <div className=" p-10 bg-(--footer) text-white ">
          <p>this is footer</p>
        </div>
      </div>
    </>
  );
}

export default PageContainer;
