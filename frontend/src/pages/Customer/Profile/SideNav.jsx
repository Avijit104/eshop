import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SideContainer from "../../../components/Container/SideContainer";
import { useNavigate } from "react-router";
import axios from "axios";
import { logout } from "../../../store/AtuhSlice";

function SideNav({ currOption }) {
  // hooks
  const navigate = useNavigate();
  const dispatcher = useDispatch();

  // states
  const user = useSelector((state) => state.auth.userData);
  const [option, setOption] = useState("");

  // user logout api call
  const onLogout = async () => {
    try {
      const res = await axios.get("/api/v1/user/logout");
      dispatcher(logout());
      navigate("/user/login");
    } catch (error) {
      console.log(error);
    }
  };

  // dom change based on content displaying
  useEffect(() => {
    setOption(currOption);
  }, [currOption]);

  // dom
  return (
    <SideContainer>
      <div className="w-full h-full flex justify-center items-start py-10 px-5">
        <div className="flex-center flex-col items-center gap-5 w-full">
          {/* side nav header */}
          <div className="flex items-center px-10 gap-4 p-2 py-3 border-2 border-blue-500 bg-black rounded-xl w-full">
            <div className="bg-[url(/person.svg)] aspect-square h-10 bg-cover bg-center p-2 border-2 border-blue-500 rounded-full  "></div>
            <div>
              <p className="text-sm text-gray-400 ">Hello, </p>
              <p className="text-lg font-bold text-blue-700">
                {user?.firstName}
              </p>
            </div>
          </div>

          {/* my orders */}
          <div className="bg-black py-2 rounded-xl w-full">
            <div
              onClick={() => {
                navigate("/");
              }}
              className="cursor-pointer flex p-3 px-5 justify-between items-center border-b border-gray-700"
            >
              <h2 className="text-lg font-bold">My Orders</h2>
              <div className="bg-[url(/forwardArrow.svg)] aspect-square h-5 bg-cover bg-center px-3"></div>
            </div>

            {/* profile */}
            <div className="p-3 px-5 border-b border-gray-700">
              <h2 className="text-lg font-bold py-3 ">My Profile</h2>
              <ul className="pl-[10%] ">
                {/* personal details option */}
                <li
                  className={`p-2 cursor-pointer ${option === "personal" ? "text-blue-700" : "text-white"} `}
                  onClick={() => {
                    setOption("personal");
                    navigate("/user/profile");
                  }}
                >
                  Personal Details
                </li>

                {/* address option */}
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

            {/* playment */}
            <div className="p- px-5 border-b  border-gray-700">
              <h2 className="font-bold text-lg py-3">Payment</h2>
              <ul className="pl-[10%]">
                {/* gift card option */}
                <li
                  className={`p-2 cursor-pointer ${option === "gift" ? "text-blue-700" : "text-white"}`}
                  onClick={() => {
                    setOption("gift");
                    navigate("/user/profile/gift-card");
                  }}
                >
                  Gift Card
                </li>

                {/* card option */}
                <li
                  className={`p-2 cursor-pointer ${option === "card" ? "text-blue-700" : "text-white"}`}
                  onClick={() => {
                    setOption("card");
                    navigate("/user/profile/card");
                  }}
                >
                  Card
                </li>

                {/* upi option */}
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

            {/* logout button */}
            <div className="flex-center p-5  ">
              <button className="button px-10" onClick={onLogout}>
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
