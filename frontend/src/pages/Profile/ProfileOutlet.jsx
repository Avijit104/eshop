import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/AtuhSlice";
import MainContainer from "../../components/MainContainer";
import PageContainer from "../../components/PageContainer";
import SideNav from "./SideNav";

function ProfileOutlet() {
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

export default ProfileOutlet;
