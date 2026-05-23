import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router";
import { updateUserData } from "../../../../store/AtuhSlice";
import MainContainer from "../../../../components/Container/MainContainer";

function SellerProfile() {
  // hooks
  const navigate = useNavigate();
  const dispatcher = useDispatch();
  const { setOption } = useOutletContext();

  // state
  const userData = useSelector((state) => state.auth.userData);
  const userRole = useSelector((state) => state.auth.role);

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

  // update name api call
  const updateUserName = async () => {
    try {
      const res = await axios.put("/api/v1/user/update/name", {
        firstName: user.firstName,
        lastName: user.lastName,
      });
      dispatcher(updateUserData(res.data.data));
      setEditUsername(true);
    } catch (error) {
      console.log(error);
    }
  };

  // update email api call
  const updateEmail = async () => {
    try {
      const res = await axios.put("/api/v1/user/update/email", {
        email: user.email,
      });
      dispatcher(updateUserData(res.data.data));
      setEditEmail(true);
    } catch (error) {
      console.log(error);
    }
  };

  // update phone number api call
  const updatePhno = async () => {
    try {
      const res = await axios.put("/api/v1/user/update/phno", {
        phno: user.phno,
      });
      dispatcher(updateUserData(res.data.data));
      setEditPhno(true);
    } catch (error) {
      console.log(error);
    }
  };

  // update side nav option
  useEffect(() => {
    setOption("seller");
  }, []);

  //dom
  return (
    <MainContainer>
      <div className="flex-center  flex-col">
        <div className="flex border-b-2 border-gray-700 w-[90%] items-center py-2 mb-10 justify-between">
          <h2 className="text-2xl font-bold ">Personal Details</h2>
        </div>

        {/* name */}
        <div className=" w-[90%] px-10   mb-5">
          <div className="flex w-full  gap-5 items-baseline-last  ">
            {/* first name  */}
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

            {/* last name  */}
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
              // edit user name button
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
              // save user name button
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
              // edit email button
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
              // save email button
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
              onChange={(e) => {
                const phoneValue = e.target.value.replace(/\D/g, "");
                setUser({ ...user, phno: phoneValue });
              }}
            />
            {editPhno ? (
              // edit phone number button
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
              // save phone number button
              <button className="button" onClick={updatePhno}>
                Save
              </button>
            )}
          </div>
        </div>

        {/* gender */}
        <div className=" w-[90%] px-10 ">
          <div className="flex-center justify-between mb-1 ">
            <h2 className="text-lg font-bold ">Gender :</h2>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex justify-around items-center input mb-0 w-[60%]">
              {/* male  */}
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

              {/* female */}
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

              {/* other */}
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

            {/* change password button */}
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

export default SellerProfile;
