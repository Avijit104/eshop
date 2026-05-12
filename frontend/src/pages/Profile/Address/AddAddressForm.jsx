import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function AddAddressForm({ removeDisplayState, data = {}, apiCall, header }) {
  // hooks
  const navigate = useNavigate();

  // states
  const userData = useSelector((state) => state.auth.userData);
  const [address, setAddress] = useState({
    name: data?.name || `${userData.firstName} ${userData.lastName}`,
    phno: data?.phno || `${userData.phno}`,
    building: data?.building || "",
    street: data?.street || "",
    landmark: data?.landmark || "",
    city: data?.city || "",
    pin: data?.pin || "",
    state: data?.state || "",
    addressType: data?.addressType || "",
  });
  const [id, setId] = useState(data?._id || "");

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

  return (
    <div className="w-full h-full rounded-2xl p-5  ">
      {/* header of the form */}
      <div className="flex justify-between items-center w-full border-b-2 border-gray-700 p-2 mb-10 ">
        <h2 className="text-lg font-bold text-blue-500">{header}</h2>
      </div>

      {/* name and phno input box */}
      <div className="flex justify-baseline items-center gap-5 mb-5">
        {/* name input */}
        <div className="w-[50%]">
          <input
            type="text"
            name="name"
            id="name"
            className="input"
            placeholder="Enter your name"
            autoComplete="off"
            value={address.name}
            onChange={(e) => setAddress({ ...address, name: e.target.value })}
          />
        </div>

        {/* phone number input */}
        <div className="w-[50%]">
          <input
            type="text"
            name="phno"
            id="phno"
            className="input"
            placeholder="Enter your phone number"
            autoComplete="off"
            inputMode="numeric"
            value={address.phno}
            onChange={(e) => {
              const phoneValue = e.target.value.replace(/\D/g, "");
              setAddress({ ...address, phno: phoneValue });
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
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
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
            onChange={(e) => setAddress({ ...address, state: e.target.value })}
          />
        </div>

        {/* address type input */}
        <div className="w-[50%] input">
          <h3 className="text-base font-bold text-(--code-bg) mb-1">
            Address Type :
          </h3>
          <div className="flex  justify-start items-center gap-3 px-1  ">
            {/* address type home */}
            <div className="flex gap-2 p-2">
              <input
                type="radio"
                name="addressType"
                id="addressType"
                value={"home"}
                checked={address.addressType === "home"}
                onChange={() => {
                  setAddressType("home");
                }}
              />
              <p className="text-base text-(--code-bg)" id="home">
                Home
              </p>
            </div>
            {/* address type work */}
            <div className="flex gap-2 p-2">
              <input
                type="radio"
                name="addressType"
                id="addressType"
                checked={address.addressType === "work"}
                value={"work"}
                onChange={() => {
                  setAddressType("work");
                }}
              />
              <p className="text-base text-(--code-bg)" id="work">
                Work
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-start gap-5 py-3">
        {/* save button */}
        <button
          className="button"
          onClick={() => {
            apiCall(address, id);
          }}
        >
          Save
        </button>

        {/* cancel button */}
        <button
          className="button"
          onClick={() => {
            removeDisplayState();
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AddAddressForm;
