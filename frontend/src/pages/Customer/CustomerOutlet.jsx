import React from "react";
import { Outlet } from "react-router";

function CustomerOutlet() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default CustomerOutlet;
