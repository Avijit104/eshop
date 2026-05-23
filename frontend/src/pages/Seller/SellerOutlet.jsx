import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router";
import axios from "axios";
import { setBusiness } from "../../store/seller/BusinessSlice";

function SellerOutlet() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default SellerOutlet;
