import React from "react";

function Logo({ css }) {
  return (
    <div className={`flex gap-2 justify-center items-center ${css}`}>
      <div className="bg-[url('/vastraLogo.png')]  h-[7vh]  aspect-square bg-cover bg-no-repeat"></div>
      <p className="text-2xl font-bold text-(--accent) ">Vastra</p>
    </div>
  );
}

export default Logo;
