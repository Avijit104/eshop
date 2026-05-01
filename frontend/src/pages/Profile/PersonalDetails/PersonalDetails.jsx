import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router";
import { login } from "../../../store/AtuhSlice";

function PersonalDetails() {
  const userData = useSelector((state) => state.auth.userData);
  const [user, setUser] = useState({
    email: userData.email,
    username: userData.username,
    phno: userData.phno,
  });
  const [editUsername, setEditUsername] = useState(true);
  const [editEmail, setEditEmail] = useState(true);
  const [editPhno, setEditPhno] = useState(true);
  const navigate = useNavigate();
  const dispatcher = useDispatch();

  const updateUser = async () => {
    try {
      const res = await axios.put("/api/v1/user/update", user);
      console.log(res.data.data);
      dispatcher(login(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex-center flex-col ">
      <h2 className="text-2xl font-bold mb-5">Personal Details</h2>
      <div className=" w-[50%]">
        <h2 className="text-lg font-bold mb-1">Email :</h2>
        <div className="flex-center  mb-5 gap-5">
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
            <button className="button" onClick={updateUser}>
              Save
            </button>
          )}
        </div>
      </div>
      <div className=" w-[50%]">
        <h2 className="text-lg font-bold mb-1">Username :</h2>
        <div className="flex-center  mb-5 gap-5">
          <input
            type="text"
            className="input mb-0"
            id="username"
            name="username"
            value={user.username}
            readOnly={editUsername}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
          {editUsername ? (
            <button
              className="button"
              onClick={() => {
                setEditUsername(false);
                document.getElementById("username").focus();
              }}
            >
              Edit
            </button>
          ) : (
            <button className="button" onClick={updateUser}>
              Save
            </button>
          )}
        </div>
      </div>
      <div className=" w-[50%]">
        <h2 className="text-lg font-bold mb-1 ">Phone Number :</h2>
        <div className="flex-center  mb-5 gap-5">
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
            <button className="button" onClick={updateUser}>
              Save
            </button>
          )}
        </div>
      </div>
      <div className=" w-[50%]">
        <div className="flex-center justify-between mb-2">
          <h2 className="text-lg font-bold ">Gender :</h2>
        </div>
        <input
          type="text"
          className="input "
          id="email"
          name="email"
          value={userData.email}
          readOnly
        />
      </div>
      <div>
        <button className="button" onClick={() => navigate("/change-password")}>
          Change Password
        </button>
      </div>
    </div>
  );
}

export default PersonalDetails;
