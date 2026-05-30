import React, { useState } from "react";
import { Outlet } from "react-router";
import Sidenav from "./Sidenav";
import PageContainer from "../../../components/container/PageContainer";

function ProfileOutlet() {
  const [option, setOption] = useState("personal");
  return (
    <PageContainer>
      <div className="w-full h-full p-5 flex flex-col gap-5  ">
        <div className="">
          <h1 className="text-4xl font-bold text-(--accent-second)">
            My Account
          </h1>
        </div>
        <div className="w-full h-full flex justify-center gap-5">
          <Sidenav option={option} />
          <Outlet context={setOption} />
        </div>
      </div>
    </PageContainer>
  );
}

export default ProfileOutlet;
