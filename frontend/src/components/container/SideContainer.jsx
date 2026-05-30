import React from "react";

function SideContainer({ children }) {
  return (
    <div className="w-[22%]  h-full">
      <div className="w-full bg-(--primary) rounded-md  overflow-hidden  ">
        {children}
      </div>
    </div>
  );
}

export default SideContainer;
