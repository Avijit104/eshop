import React from "react";

function MainContainer({ children }) {
  return (
    <div className="w-[78%] h-full flex justify-center items-baseline p-5 overflow-auto  ">
      <div className="w-full   h-[40%] rounded-md ">{children}</div>
    </div>
  );
}

export default MainContainer;
