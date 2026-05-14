import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import MainContainer from "../../../../components/Container/MainContainer";
import axios from "axios";

function BusinessRegistration() {
  // hooks
  const navigate = useNavigate();

  // states
  const userData = useSelector((state) => state.auth.userData);
  const [business, setBusiness] = useState({ gst: "", businessName: "" });
  const [address, setAddress] = useState({
    name: `${userData?.firstName} ${userData?.lastName}` || "",
    phno: userData?.phno,
    building: "",
    street: "",
    landmark: "",
    city: "",
    pin: "",
    state: "",
    addressType: "business",
  });
  const [id, setId] = useState("");

  // address type dom manipulation
  const setAddressType = (value) => {
    setAddress({ ...address, addressType: `${value}` });
    document.getElementById("home").style.color = "#8c8c8c";
    document.getElementById("work").style.color = "#8c8c8c";
    document.getElementById("home").style.fontWeight = "normal";
    document.getElementById("work").style.fontWeight = "normal";
    document.getElementById(`${value}`).style.color = "blue";
    document.getElementById(`${value}`).style.fontWeight = "bold";
  };

  // Business register api call
  const onBusinessRegister = async () => {
    try {
      const addressRes = await axios.post(
        "/api/v1/seller/add-address",
        address,
      );
      const businessRes = await axios.post("/api/v1/seller/add-business", {
        ...business,
        address: addressRes.data.data._id,
      });
      console.log(addressRes.data.data);
      console.log(businessRes.data.data);
      navigate("/seller");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main flex-center">
      <div className="flex-center flex-col w-[60%] text-2xl gap-7  bg-black rounded-2xl p-10">
        <div className="pb-4  w-[75%] border-b-2 border-gray-700">
          <h1 className="font-bold text-center">Register Business</h1>
        </div>
        <div className="w-[75%]  ">
          {/* name and phno input box */}
          <div className="flex justify-baseline items-center gap-5 mb-5">
            {/* name input */}
            <div className="w-[50%]">
              <input
                type="text"
                name="name"
                id="name"
                className="input"
                placeholder="Enter your business name"
                autoComplete="off"
                value={business.businessName}
                onChange={(e) =>
                  setBusiness({ ...business, businessName: e.target.value })
                }
              />
            </div>

            {/* phone number input */}
            <div className="w-[50%]">
              <input
                type="text"
                name="phno"
                id="phno"
                className="input"
                placeholder="Enter your GSTIN"
                autoComplete="off"
                inputMode="numeric"
                value={business.gst}
                onChange={(e) => {
                  setBusiness({ ...business, gst: e.target.value });
                }}
              />
            </div>
          </div>

          {/* street, buiding and landmark input box */}
          <div className=" grid grid-cols-2 gap-5 mb-5 ">
            {/* street input box */}
            <div className="w-full h-full">
              {/* street input  */}
              <div className=" flex flex-col h-full">
                <textarea
                  name="street"
                  id="street"
                  placeholder="Enter your address (street and area)"
                  className="input block resize-none h-full"
                  autoComplete="off"
                  value={address.street}
                  onChange={(e) =>
                    setAddress({ ...address, street: e.target.value })
                  }
                ></textarea>
              </div>
            </div>

            {/* building and landmark input box */}
            <div className="w-full flex flex-col gap-5">
              {/* building input */}
              <div className="w-full">
                <input
                  type="text"
                  name="building"
                  id="building"
                  placeholder="Enter your Building name/no. (Optional)"
                  className="input"
                  value={address.building}
                  onChange={(e) =>
                    setAddress({ ...address, building: e.target.value })
                  }
                />
              </div>

              {/* landmark input */}
              <div className="w-full">
                <input
                  type="text"
                  name="landmark"
                  id="landmark"
                  placeholder="Enter your landmark"
                  className="input"
                  value={address.landmark}
                  onChange={(e) =>
                    setAddress({ ...address, landmark: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* city and pin input box */}
          <div className="flex justify-baseline items-center gap-5 mb-5">
            {/* city input */}
            <div className="w-[50%]">
              <input
                type="text"
                name="city"
                id="city"
                className="input"
                placeholder="Enter your city/village name"
                value={address.city}
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
              />
            </div>

            {/* pin input */}
            <div className="w-[50%]">
              <input
                type="text"
                name="pin"
                id="pin"
                inputMode="numeric"
                className="input"
                placeholder="Enter your pin code"
                value={address.pin}
                onChange={(e) => {
                  const pinValue = e.target.value.replace(/\D/g, "");
                  setAddress({ ...address, pin: pinValue });
                }}
              />
            </div>
          </div>

          {/* state and address type input box */}
          <div className="flex justify-baseline items-start gap-5 mb-5">
            {/* state input */}
            <div className="w-[50%]">
              <input
                type="text"
                name="state"
                id="state"
                className="input"
                placeholder="Enter your state"
                value={address.state}
                onChange={(e) =>
                  setAddress({ ...address, state: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex items-center justify-center gap-5 py-3">
            {/* save button */}
            <button className="button" onClick={onBusinessRegister}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BusinessRegistration;
