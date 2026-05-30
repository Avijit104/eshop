import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function AddressForm({ header, item, displayForm, apiCall }) {
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const [address, setAddress] = useState({
    name: item?.name || `${userData?.firstName} ${userData?.lastName}`,
    phno: item?.phno || userData?.phno,
    street: item?.street || "",
    building: item?.building || "",
    landmark: item?.landmark || "",
    city: item?.city || "",
    pin: item?.pin || "",
    state: item?.state || "",
    addressType: item?.addressType || "",
  });

  return (
    <div className="w-full px-5 py-2">
      <div className="p-2 border-b-2 border-(--accent) mb-5">
        <h2 className="text-xl font-bold text-(--accent)">{header}</h2>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex gap-5">
          <div className="w-[50%]">
            <h2 className="text-sm text-(--text) font-semibold mb-1">Name</h2>
            <input
              type="text"
              className="input"
              placeholder="Enter your name"
              name="name"
              id="name"
              value={address.name}
              onChange={(e) => setAddress({ ...address, name: e.target.value })}
            />
          </div>
          <div className="w-[50%]">
            <h2 className="text-sm text-(--text) font-semibold mb-1">
              Phone Number
            </h2>
            <input
              type="text"
              className="input"
              placeholder="Enter your phone number"
              name="phno"
              id="phno"
              value={address.phno}
              onChange={(e) => {
                const phoneValue = e.target.value
                  .replace(/\D/g, "")
                  .slice(0, 10);
                setAddress({ ...address, phno: phoneValue });
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div className="w-full h-full flex flex-col ">
            <h2 className="text-sm text-(--text) font-semibold mb-1">
              Street/Locality
            </h2>
            <textarea
              name="street"
              id="street"
              className="input resize-none h-full"
              placeholder="Enter your street/locality"
              value={address.street}
              onChange={(e) =>
                setAddress({ ...address, street: e.target.value })
              }
            ></textarea>
          </div>
          <div className="w-full flex flex-col justify-between gap-3">
            <div>
              <h2 className="text-sm text-(--text) font-semibold mb-1">
                Building Name/Flat Number
              </h2>
              <input
                type="text"
                className="input"
                name="building"
                id="building"
                placeholder="Enter your building name (optional)"
                value={address.building}
                onChange={(e) =>
                  setAddress({ ...address, building: e.target.value })
                }
              />
            </div>
            <div>
              <h2 className="text-sm text-(--text) font-semibold mb-1">
                Landmark
              </h2>
              <input
                type="text"
                className="input"
                name="landmark"
                id="landmark"
                placeholder="Enter your landmark"
                value={address.landmark}
                onChange={(e) =>
                  setAddress({ ...address, landmark: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        <div className="flex gap-5">
          <div className="w-[50%]">
            <h2 className="text-sm text-(--text) font-semibold mb-1">City</h2>
            <input
              type="text"
              className="input"
              name="city"
              id="city"
              placeholder="Enter your city name"
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
            />
          </div>
          <div className="w-[50%]">
            <h2 className="text-sm text-(--text) font-semibold mb-1">Pin</h2>
            <input
              type="text "
              className="input"
              name="pin"
              id="pin"
              placeholder="Enter your area pin code"
              value={address.pin}
              onChange={(e) => {
                const pinValue = e.target.value.replace(/\D/g, "").slice(0, 6);
                setAddress({ ...address, pin: pinValue });
              }}
            />
          </div>
        </div>

        <div className="flex gap-5 items-baseline-last">
          <div className="w-[50%]">
            <h2 className="text-sm text-(--text) font-semibold mb-1">State</h2>
            <input
              type="text"
              className="input"
              name="state"
              id="state"
              placeholder="Enter your state"
              value={address.state}
              onChange={(e) =>
                setAddress({ ...address, state: e.target.value })
              }
            />
          </div>
          <div className="w-[50%]">
            <h2 className="text-sm text-(--text) font-semibold mb-1">
              Address Type
            </h2>
            <div className="input flex px-10 gap-10">
              <div className="flex gap-2 items-center">
                <input
                  type="radio"
                  name="addressType"
                  id="home"
                  className="appearance-none w-[1.5vh] aspect-square rounded-2xl scale-125 bg-(--primary) border-2 checked:bg-(--accent) checked:border"
                  onClick={() =>
                    setAddress({ ...address, addressType: "home" })
                  }
                />
                <p className="text-base text-(--text) font-semibold">Home</p>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="radio"
                  name="addressType"
                  id="work"
                  className="appearance-none w-[1.5vh] aspect-square rounded-2xl scale-125 bg-(--primary) border-2 checked:bg-(--accent) checked:border"
                  onClick={() =>
                    setAddress({ ...address, addressType: "work" })
                  }
                />
                <p className="text-base text-(--text) font-semibold">Work</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[50%] flex gap-5">
          {item ? (
            <button
              className="button p-2 border-2 border-(--accent) bg-(--accent) text-white px-10 hover:text-white"
              onClick={() => apiCall(item?._id, address)}
            >
              Save
            </button>
          ) : (
            <button
              className="button p-2 border-2 border-(--accent) bg-(--accent) text-white px-10 hover:text-white"
              onClick={() => apiCall(address)}
            >
              Add Address
            </button>
          )}
          <button
            className="button p-2 border-2 border-(--accent) bg-(--accent) text-white px-10 hover:text-white"
            onClick={() => displayForm("")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddressForm;
