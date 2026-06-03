import React from "react";

function MainContainer({ children }) {
  return (
    <div className="w-full h-full flex justify-center items-baseline    pb-10 ">
      <div className="w-full h-fit  rounded-md overflow-hidden  z-10">
        {children}
      </div>
    </div>
  );
}

export default MainContainer;
