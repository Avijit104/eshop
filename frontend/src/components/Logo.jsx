import React from "react";
import { useNavigate } from "react-router";

function Logo({ css }) {
  const navigate = useNavigate();
  return (
    <div
      className={`flex  justify-center items-center ${css} cursor-pointer`}
      onClick={() => navigate("/")}
    >
      <div className="bg-[url('/vastraLogo.png')]  h-[7vh]  aspect-square bg-cover bg-no-repeat"></div>
      <p className="text-3xl font-bold text-(--accent-second) ">Vastra</p>
    </div>
  );
}

export default Logo;
