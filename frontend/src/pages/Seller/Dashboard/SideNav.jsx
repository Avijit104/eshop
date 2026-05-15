import React from "react";
import SideContainer from "../../../components/Container/SideContainer";
import axios from "axios";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/AtuhSlice";

function SideNav() {
  const navigate = useNavigate();
  const dispatcher = useDispatch();
  const onLogout = async () => {
    try {
      console.log("this is seller logout");
      const res = await axios.get("/api/v1/user/logout");
      dispatcher(logout());
      navigate("/seller");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SideContainer>
      <div className="w-full h-full flex justify-center items-start   p-10">
        <div className="flex-center flex-col items-start gap-5 ">
          <div className="w-full bg-black p-5 rounded-2xl">
            <h1
              className="border text-xl font-bold text-blue-500"
              onClick={() => navigate("/seller/dashboard")}
            >
              Dashboard
            </h1>
          </div>
          <div className=" bg-black rounded-2xl">
            <div className="px-15 py-4 border-b border-gray-700">
              <h2
                className="text-lg"
                onClick={() => navigate("/seller/dashboard/profile")}
              >
                My Profile
              </h2>
            </div>
            <div className="px-15 py-4 border-b border-gray-700">
              <h2 className="text-lg">Businesses</h2>
            </div>
            <div className="px-15 py-5 rounded-2xl bg-black  ">
              <button className="button px-15" onClick={onLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </SideContainer>
  );
}

export default SideNav;
