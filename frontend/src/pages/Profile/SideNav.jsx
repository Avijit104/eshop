import React from "react";
import { useSelector, useDispatch } from "react-redux";
import SideContainer from "../../components/SideContainer";
import { useNavigate } from "react-router";
import axios from "axios";

function SideNav() {
  const user = useSelector((state) => state.auth.userData);
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

  return (
    <SideContainer>
      <div className="w-full h-full p-10 flex flex-col gap-5">
        <div>
          <div className="flex items-center px-10 gap-4 p-2 py-3 bg-black rounded-xl">
            <div className="bg-[url(/person.svg)] aspect-square h-10 bg-cover bg-center rounded-2xl "></div>
            <div>
              <p className="text-sm text-gray-400 ">Hello, </p>
              <p className="text-lg font-bold text-blue-700">
                {user?.username}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-black py-2 rounded-xl ">
          <div
            onClick={() => {
              navigate("/");
            }}
            className="cursor-pointer flex p-3 px-5 justify-between items-center border-b border-gray-900"
          >
            <h2 className="text-lg font-bold">My Orders</h2>
            <div className="bg-[url(/forwardArrow.svg)] aspect-square h-5 bg-cover bg-center px-3"></div>
          </div>
          <div className="p-3 px-5 border-b border-gray-900">
            <h2 className="text-lg font-bold py-3 ">My Profile</h2>
            <ul className="pl-[10%] ">
              <li
                className="p-2 cursor-pointer"
                onClick={() => {
                  navigate("/user");
                }}
              >
                Personal Details
              </li>
              <li
                className="p-2 cursor-pointer"
                onClick={() => {
                  navigate("/user/address");
                }}
              >
                Address
              </li>
            </ul>
          </div>
          <div className="p- px-5 border-b  border-gray-900">
            <h2 className="font-bold text-lg py-3">Payment</h2>
            <ul className="pl-[10%]">
              <li className="p-2 cursor-pointer">Gift Card</li>
              <li className="p-2 cursor-pointer">Card</li>
              <li className="p-2 cursor-pointer">Upi</li>
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
