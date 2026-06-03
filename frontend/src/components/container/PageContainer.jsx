import React from "react";
import Logo from "../Logo";
import SideContainer from "./SideContainer";
import MainContainer from "./MainContainer";
import { useSelector } from "react-redux";

function PageContainer({ children }) {
  const role = useSelector((state) => state.auth.role);
  return (
    <>
      <div className="bg-(--background)  w-full h-fit flex justify-center ">
        <div className=" w-[90%] ">{children}</div>
      </div>
    </>
  );
}

export default PageContainer;
