import React from "react";
import PageContainer from "../../../components/Container/PageContainer";
import SideNav from "./SideNav";
import { Outlet } from "react-router";

function DashboardOutlet() {
  return (
    <PageContainer>
      <div className=" flex w-full h-full">
        <div className="flex-center items-start w-full h-full">
          <SideNav />
          <Outlet />
        </div>
      </div>
    </PageContainer>
  );
}

export default DashboardOutlet;
