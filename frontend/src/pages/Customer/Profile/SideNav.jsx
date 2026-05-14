import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SideContainer from "../../../components/Container/SideContainer";
import { useNavigate } from "react-router";
import axios from "axios";
import { logout } from "../../../store/Customer/AtuhSlice";

function SideNav() {
  const user = useSelector((state) => state.auth.userData);
  const [option, setOption] = useState("personal");
  const navigate = useNavigate();
  const dispatcher = useDispatch();
  const onLogout = async () => {
    try {
      const res = await axios.get("/api/v1/auth/logout");
      dispatcher(logout());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setOption((prev) => prev);
  }, []);
  return (
    <SideContainer>
      <div className="w-full h-full p-10 flex flex-col gap-5">
        <div>
          <div className="flex items-center px-10 gap-4 p-2 py-3 border-2 border-blue-500 bg-black rounded-xl">
            <div className="bg-[url(/person.svg)] aspect-square h-10 bg-cover bg-center p-2 border-2 border-blue-500 rounded-full  "></div>
            <div>
              <p className="text-sm text-gray-400 ">Hello, </p>
              <p className="text-lg font-bold text-blue-700">
                {user?.firstName}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-black py-2 rounded-xl ">
          <div
            onClick={() => {
              navigate("/");
            }}
            className="cursor-pointer flex p-3 px-5 justify-between items-center border-b border-gray-700"
          >
            <h2 className="text-lg font-bold">My Orders</h2>
            <div className="bg-[url(/forwardArrow.svg)] aspect-square h-5 bg-cover bg-center px-3"></div>
          </div>
          <div className="p-3 px-5 border-b border-gray-700">
            <h2 className="text-lg font-bold py-3 ">My Profile</h2>
            <ul className="pl-[10%] ">
              <li
                className={`p-2 cursor-pointer ${option === "personal" ? "text-blue-700" : "text-white"} `}
                onClick={() => {
                  setOption("personal");
                  navigate("/user/profile");
                }}
              >
                Personal Details
              </li>
              <li
                className={`p-2 cursor-pointer ${option === "address" ? "text-blue-700" : "text-white"}`}
                onClick={() => {
                  setOption("address");
                  navigate("/user/profile/address");
                }}
              >
                Address
              </li>
            </ul>
          </div>
          <div className="p- px-5 border-b  border-gray-700">
            <h2 className="font-bold text-lg py-3">Payment</h2>
            <ul className="pl-[10%]">
              <li
                className={`p-2 cursor-pointer ${option === "gift" ? "text-blue-700" : "text-white"}`}
                onClick={() => {
                  setOption("gift");
                  navigate("/user/profile/gift-card");
                }}
              >
                Gift Card
              </li>
              <li
                className={`p-2 cursor-pointer ${option === "card" ? "text-blue-700" : "text-white"}`}
                onClick={() => {
                  setOption("card");
                  navigate("/user/profile/card");
                }}
              >
                Card
              </li>
              <li
                className={`p-2 cursor-pointer ${option === "upi" ? "text-blue-700" : "text-white"}`}
                onClick={() => {
                  setOption("upi");
                  navigate("/user/profile/upi");
                }}
              >
                Upi
              </li>
            </ul>
          </div>
          <div className="flex justify-center items-center p-4">
            <button className="button px-20" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </SideContainer>
  );
}

export default SideNav;
