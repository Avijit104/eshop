import React, { useEffect, useState } from "react";
import PageContainer from "../../../components/Container/PageContainer";
import SideNav from "./SideNav";
import { Outlet } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setBusiness } from "../../../store/seller/BusinessSlice";

function DashboardOutlet() {
  const [option, setOption] = useState("");
  const dispatcher = useDispatch();

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const res = await axios.get("/api/v1/seller");
        dispatcher(setBusiness(res.data.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchBusiness();
  }, []);

  return (
    <PageContainer>
      <div className=" flex w-full h-full">
        <div className="flex-center items-start w-full h-full">
          {/* side nav */}
          <SideNav currOption={option} />

          {/* outlet */}
          <Outlet context={{ setOption }} />
        </div>
      </div>
    </PageContainer>
  );
}

export default DashboardOutlet;
