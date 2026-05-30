import React from "react";
import Logo from "../Logo";
import Navbar from "../header/Navbar";
import SideContainer from "./SideContainer";
import MainContainer from "./MainContainer";

function PageContainer({ children }) {
  return (
    <>
      <div className="w-full min-h-screen h-screen">
        <div className="bg-(--primary)  flex items-center justify-center h-[9%] gap-10">
          <Navbar />
        </div>
        <div className="bg-(--background)  w-full h-fit flex justify-center ">
          <div className=" w-[90%] ">{children}</div>
        </div>
        <div className=" p-10 bg-(--footer) text-white ">
          <p>this is footer</p>
        </div>
      </div>
    </>
  );
}

export default PageContainer;
