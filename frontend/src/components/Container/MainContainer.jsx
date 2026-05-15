import React from "react";
import PageContainer from "./PageContainer";

function MainContainer({ children }) {
  return (
    <div className="w-[78%] h-full flex justify-center items-baseline p-5 overflow-auto bg-neutral-700  ">
      <div className="w-[90%] py-10 h-fit   bg-black rounded-2xl z-10 ">
        {children}
      </div>
    </div>
  );
}

export default MainContainer;
