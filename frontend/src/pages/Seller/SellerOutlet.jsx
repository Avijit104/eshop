import React from "react";
import { Outlet } from "react-router";

function SellerOutlet() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default SellerOutlet;
