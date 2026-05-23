import React, { useEffect } from "react";
import MainContainer from "../../../../components/Container/MainContainer";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setBusiness } from "../../../../store/seller/BusinessSlice";
import { useOutletContext } from "react-router";

function Dashboard() {
  const dispatcher = useDispatch();
  const { setOption } = useOutletContext();

  return (
    <MainContainer>
      <div className="flex-center">
        <div className="flex border-b-2 border-gray-700 w-[90%] items-center py-2 mb-10 justify-between">
          <h2 className="text-2xl font-bold ">Dashboard</h2>
        </div>
      </div>
    </MainContainer>
  );
}

export default Dashboard;
