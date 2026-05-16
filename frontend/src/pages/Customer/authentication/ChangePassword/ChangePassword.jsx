import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../../../../store/AtuhSlice";
import PageContainer from "../../../../components/Container/PageContainer";

function ChangePassword() {
  // hooks
  const navigate = useNavigate();
  const dispatcher = useDispatch();

  // states
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
  });

  // api call for changing password
  const changePassword = async () => {
    try {
      const res = await axios.put("/api/v1/user/change-password", password);
      const logoutRes = await axios.get("/api/v1/user/logout");
      dispatcher(logout());
      navigate("/login");
    } catch (error) {
      console.log({ ...error });
    }
  };

  // dom return
  return (
    <PageContainer>
      <div className="w-full h-full flex-center ">
        <div className="flex-center flex-col w-[40%] text-2xl gap-10  bg-black rounded-2xl p-10">
          <div className="pb-4  w-[90%] border-b-2 border-gray-700">
            <h1 className="font-bold text-center">Change Password</h1>
          </div>
          <div className="w-[75%]">
            {/* old password input */}
            <input
              type="text"
              className="input mb-5"
              placeholder="Enter your old password"
              id="oldPass"
              name="oldPass"
              value={password.oldPassword}
              onChange={(e) =>
                setPassword({ ...password, oldPassword: e.target.value })
              }
            />
            {/* new password input */}
            <input
              type="text"
              className="input"
              placeholder="Enter your new password"
              id="newPass"
              name="newPass"
              value={password.newPassword}
              onChange={(e) =>
                setPassword({ ...password, newPassword: e.target.value })
              }
            />
          </div>
          <div className="w-full flex-center">
            {/* change password button */}
            <button className="button" onClick={changePassword}>
              Change Password
            </button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default ChangePassword;
