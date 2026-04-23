import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";

function ChangePassword() {
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const navigate = useNavigate();
  const changePassword = async () => {
    try {
      const res = await axios.post("/api/v1/user/change-password", password);
      if (res) {
        navigate("/user/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="main flex-center ">
      <div className="flex-center flex-col w-[40%] text-2xl gap-10  bg-black rounded-2xl p-10">
        <h1 className="font-bold">Change Password</h1>
        <div className="w-[75%]">
          <input
            type="text"
            className="input"
            placeholder="Old Password"
            id="oldPass"
            name="oldPass"
            value={password.oldPassword}
            onChange={(e) =>
              setPassword({ ...password, oldPassword: e.target.value })
            }
          />
          <input
            type="text"
            className="input"
            placeholder="New Password"
            id="newPass"
            name="newPass"
            value={password.newPassword}
            onChange={(e) =>
              setPassword({ ...password, newPassword: e.target.value })
            }
          />
        </div>
        <div className="w-full flex-center">
          <button className="button" onClick={changePassword}>
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
