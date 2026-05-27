import React from "react";

function Logo({ css }) {
  return (
    <div className={`flex  justify-center items-center ${css}`}>
      <div className="bg-[url('/vastraLogo.png')]  h-[7vh]  aspect-square bg-cover bg-no-repeat"></div>
      <p className="text-3xl font-bold text-(--accent-second) ">Vastra</p>
    </div>
  );
}

export default Logo;
