import React from "react";
import { Outlet } from "react-router";

function CustomerOutlet() {
  return (
    <div className="">
      <Outlet />
    </div>
  );
}

export default CustomerOutlet;
