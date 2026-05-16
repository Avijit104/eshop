import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/AtuhSlice";
import MainContainer from "../../../components/Container/PageContainer";
import PageContainer from "../../../components/Container/PageContainer";
import SideNav from "./SideNav";

function ProfileOutlet() {
  // states
  const [current, setCurrent] = useState("");

  // dom
  return (
    <PageContainer>
      <div className=" flex w-full h-full">
        <div className="flex-center items-start w-full h-full">
          <SideNav currOption={current} />
          <Outlet context={{ setCurrent }} />
        </div>
      </div>
    </PageContainer>
  );
}

export default ProfileOutlet;
