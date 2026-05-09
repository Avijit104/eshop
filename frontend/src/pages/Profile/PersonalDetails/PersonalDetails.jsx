import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router";
import { login } from "../../../store/AtuhSlice";
import MainContainer from "../../../components/MainContainer";

function PersonalDetails() {
  const userData = useSelector((state) => state.auth.userData);
  const [user, setUser] = useState({
    email: userData?.email,
    firstName: userData?.firstName,
    lastName: userData?.lastName,
    phno: userData?.phno,
    gender: userData?.gender,
  });
  const [editUsername, setEditUsername] = useState(true);
  const [editEmail, setEditEmail] = useState(true);
  const [editPhno, setEditPhno] = useState(true);
  const navigate = useNavigate();
  const dispatcher = useDispatch();

  const updateUserName = async () => {
    try {
      const res = await axios.put("/api/v1/user/update/name", {
        firstName: user.firstName,
        lastName: user.lastName,
      });
      dispatcher(login(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  const updateEmail = async () => {
    try {
      const res = await axios.put("/api/v1/user/update/email", {
        email: user.email,
      });
      dispatcher(login(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  const updatePhno = async () => {
    try {
      const res = await axios.put("/api/v1/user/update/phno", {
        phno: user.phno,
      });
      dispatcher(login(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainContainer>
      <div className="flex-center  flex-col">
        <div className="flex border-b-2 border-gray-700 w-[80%] items-center py-2 mb-10 justify-between">
          <h2 className="text-2xl font-bold ">Personal Details</h2>
        </div>

        {/* name */}
        <div className=" w-[90%] px-10   mb-5">
          <div className="flex w-full  gap-5 items-baseline-last  ">
            <div className="w-[50%]">
              <h2 className="text-lg font-bold mb-1">First Name :</h2>
              <input
                type="text"
                className="input mb-0 "
                id="firstName"
                name="firstName"
                value={user.firstName}
                readOnly={editUsername}
                onChange={(e) =>
                  setUser({ ...user, firstName: e.target.value })
                }
              />
            </div>
            <div className="w-[50%]">
              <h2 className="text-lg font-bold mb-1">Last Name:</h2>
              <input
                type="text"
                className="input mb-0"
                id="lastName"
                name="lastName"
                value={user.lastName}
                readOnly={editUsername}
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              />
            </div>
            {editUsername ? (
              <button
                className="button  "
                onClick={() => {
                  setEditUsername(false);
                  document.getElementById("lastName").focus();
                  document.getElementById("firstName").focus();
                }}
              >
                Edit
              </button>
            ) : (
              <button className="button" onClick={updateUserName}>
                Save
              </button>
            )}
          </div>
        </div>

        {/* Email */}
        <div className=" w-[90%] px-10  mb-5 ">
          <h2 className="text-lg font-bold mb-1">Email :</h2>
          <div className="flex-center w-[60%]  mb-5 gap-5">
            <input
              type="text"
              className="input mb-0 "
              id="email"
              name="email"
              value={user.email}
              readOnly={editEmail}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            {editEmail ? (
              <button
                className="button"
                onClick={() => {
                  setEditEmail(false);
                  document.getElementById("email").focus();
                }}
              >
                Edit
              </button>
            ) : (
              <button className="button" onClick={updateEmail}>
                Save
              </button>
            )}
          </div>
        </div>

        {/* Phone number  */}
        <div className=" w-[90%] px-10 ">
          <h2 className="text-lg font-bold mb-1 ">Phone Number :</h2>
          <div className="flex-center  mb-5 gap-5 w-[60%]">
            <input
              type="text"
              className="input mb-0"
              id="phno"
              name="phno"
              value={user.phno}
              readOnly={editPhno}
              onChange={(e) => setUser({ ...user, phno: e.target.value })}
            />
            {editPhno ? (
              <button
                className="button"
                onClick={() => {
                  setEditPhno(false);
                  document.getElementById("phno").focus();
                }}
              >
                Edit
              </button>
            ) : (
              <button className="button" onClick={updatePhno}>
                Save
              </button>
            )}
          </div>
        </div>

        {/* gender */}
        <div className=" w-[90%] px-10 ">
          <div className="flex-center justify-between mb-2">
            <h2 className="text-lg font-bold ">Gender :</h2>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex justify-around items-center input mb-0 w-[60%]">
              <div className="flex gap-2">
                <input
                  type="radio"
                  name="gender"
                  id="gender"
                  checked={user.gender === "male"}
                  readOnly
                />
                <p>Male</p>
              </div>
              <div className="flex gap-2">
                <input
                  type="radio"
                  name="gender"
                  id="gender"
                  checked={user.gender === "female"}
                  readOnly
                />
                <p>Female</p>
              </div>
              <div className="flex gap-2">
                <input
                  type="radio"
                  name="gender"
                  id="gender"
                  checked={user.gender === "other"}
                  readOnly
                />
                <p>Other</p>
              </div>
            </div>
            <button
              className="button"
              onClick={() => navigate("/change-password")}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </MainContainer>
  );
}

export default PersonalDetails;
