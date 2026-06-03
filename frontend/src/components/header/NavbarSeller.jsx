import React from "react";
import Logo from "../Logo";
import { useSelector } from "react-redux";

function NavbarSeller() {
  const isLogin = useSelector((state) => state.auth.isLogin);

  return (
    <div className="w-full h-full flex justify-between items-center px-10 gap-3 bg-(--primary)">
      <Logo css={"gap-2"} />
      <div className="flex justify-center items-center gap-5">
        <button className="button">Login</button>
        <button className="button">Signup</button>
      </div>
    </div>
  );
}

export default NavbarSeller;
