import React from "react";
import Logo from "../Logo";
import { useSelector } from "react-redux";

function NavbarSeller() {
  const isLogin = useSelector((state) => state.auth.isLogin);

  return (
    <div className="w-full h-full flex justify-between items-center px-10 gap-3">
      <Logo css={"gap-2"} />
      <div>
        <p>this is seller navbar</p>
      </div>
    </div>
  );
}

export default NavbarSeller;
