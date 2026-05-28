import React from "react";

function MainContainer({ children }) {
  return (
    <div className="w-[78%] h-full overflow-auto  ">
      <div className="w-full h-[40%] rounded-md bg-(--primary)  ">
        {children}
      </div>
    </div>
  );
}

export default MainContainer;
