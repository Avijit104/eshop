import React from "react";
import PageContainer from "./PageContainer";

function MainContainer({ children }) {
  console.log("this is main", children);
  return (
    <div className="w-[78%] h-full flex justify-center items-baseline p-5 overflow-auto  ">
      <div className="w-[90%] py-5  h-fit   bg-black rounded-2xl z-10 ">
        {children}
      </div>
    </div>
  );
}

export default MainContainer;
