import React from "react";
import { useNavigate } from "react-router";

function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full box-border flex justify-between items-center px-15 bg-black ">
      <div>
        <h1 className="text-blue-500 font-bold text-3xl">Ethenicity</h1>
      </div>
      <div className="flex gap-10">
        <button className="button rounded-3xl" onClick={() => navigate("/")}>
          Home
        </button>
        <button
          className="button rounded-3xl"
          onClick={() => navigate("/seller")}
        >
          Become Seller
        </button>
        <button
          className="button rounded-3xl"
          onClick={() => navigate("/user/login")}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Navbar;
