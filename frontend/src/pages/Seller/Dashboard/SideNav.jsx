import React, { useEffect, useState } from "react";
import SideContainer from "../../../components/Container/SideContainer";
import axios from "axios";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/AtuhSlice";
import { unsetBusiness } from "../../../store/seller/BusinessSlice";

function SideNav({ currOption }) {
  // hooks
  const navigate = useNavigate();
  const dispatcher = useDispatch();

  // states
  const business = useSelector((state) => state.business.businessDetails);
  const [showBusiness, setShowBusiness] = useState(false);
  const [option, setOption] = useState("");

  // seller logout api call
  const onLogout = async () => {
    try {
      const res = await axios.get("/api/v1/user/logout");
      dispatcher(unsetBusiness());
      dispatcher(logout());
      navigate("/seller");
    } catch (error) {
      console.log(error);
    }
  };

  // setting side nav selected option
  useEffect(() => {
    setOption(currOption);
  }, [currOption]);

  // dom
  return (
    <SideContainer>
      <div className="w-full h-full flex justify-center items-start   py-10 px-5">
        <div className="flex-center flex-col items-center gap-5 w-full ">
          {/* dashboard box */}
          <div className="w-full bg-black p-5 rounded-2xl">
            <h1
              className="text-xl font-bold text-blue-500 text-center"
              onClick={() => navigate("/seller/dashboard")}
            >
              Dashboard
            </h1>
          </div>

          {/* other options box */}
          <div className=" bg-black overflow-hidden rounded-2xl w-full">
            {/* seller profile box */}
            <div
              className={`border-b border-gray-700  ${option === "seller" ? "bg-neutral-700" : "bg-black"}`}
            >
              <h2
                className={`text-lg py-4 px-10 ${option === "seller" ? "text-blue-500" : "text-white"}`}
                onClick={() => {
                  setShowBusiness(false);
                  navigate("/seller/dashboard/profile");
                }}
              >
                My Profile
              </h2>
            </div>

            {/* business details box */}
            <div className=" py-4 border-b border-gray-700 w-full">
              <h2
                className={`text-lg  px-10 ${showBusiness ? "text-blue-500 pb-2" : "text-white"}`}
                onClick={() => {
                  setShowBusiness((prev) => !prev);
                  setOption("");
                }}
              >
                Businesses
              </h2>
              {
                // individual business details
                showBusiness && (
                  <div className=" ">
                    {business.map((item) => (
                      <li
                        className={`px-15 py-3 hover:bg-neutral-700   list-none w-full  ${option === item._id ? "text-blue-500 bg-neutral-700" : "text-white bg-black"}`}
                        onClick={() => {
                          navigate(`/seller/dashboard/business/${item._id}`);
                        }}
                        key={item._id}
                      >
                        {item.businessName}
                      </li>
                    ))}
                  </div>
                )
              }
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
