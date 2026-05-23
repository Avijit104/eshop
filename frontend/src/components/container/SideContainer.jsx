import React from "react";

function SideContainer({ children }) {
  return (
    <div className="w-[22%] h-full flex justify-center items-start p-5 ">
      <div className="w-full bg-(--primary) rounded-md  overflow-hidden ">
        {children}
      </div>
    </div>
  );
}

export default SideContainer;
