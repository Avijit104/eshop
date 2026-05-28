import React, { useState } from "react";
import PageContainer from "../../components/container/PageContainer";
import Logo from "../../components/Logo";
import { useActionData, useAsyncError, useNavigate } from "react-router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/AuthSlice";

function ChangePassword() {
  const dispatcher = useDispatch();
  const navigate = useNavigate();

  const role = useSelector((state) => state.auth.role);
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  const onChangePassword = async () => {
    try {
      if (password.newPassword && password.oldPassword) {
        const res = await axios.put("/api/v1/user/change-password", password);
        console.log(res.data.data);
        const resLogout = await axios.get("/api/v1/user/logout");
        dispatcher(logout());
        navigate(`/${role}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <PageContainer>
      <div className=" w-full h-full flex justify-center items-center">
        <div className="w-[35%] bg-(--primary) p-10 rounded-lg  shadow-(--shadow) flex flex-col justify-center items-center gap-7">
          {/* logo */}
          <Logo css={"flex-col gap-1"} />

          {/* header box */}
          <div className=" w-[90%] flex flex-col gap-2 text-center">
            <h2 className="text-2xl font-bold text-(--accent)">
              Change Password
            </h2>
            <div className="text-center">
              <p className="text-sm text-(--text-secondary)">
                Please login again after change password
              </p>
            </div>
          </div>

          {/* input box */}
          <div className="w-[90%] flex flex-col gap-2">
            {/* old password input */}
            <div className="w-full">
              <h2 className="text-sm text-(--text) font-semibold">
                Old Password
              </h2>
              <div className="flex input p-0  ">
                <input
                  type={`${showOldPass ? "text" : "password"}`}
                  name="oldPassword"
                  id="oldPassword"
                  placeholder="Enter your old password"
                  value={password.oldPassword}
                  className="w-full p-2   focus:outline-0"
                  onChange={(e) =>
                    setPassword({ ...password, oldPassword: e.target.value })
                  }
                />

                {/* hide and show old password button */}
                {showOldPass ? (
                  // hide button
                  <button
                    className="button text-sm  border-0 text-(--accent) underline focus:bg-(--primary) focus:text-(--accent) hover:border-0"
                    onClick={() => setShowOldPass(false)}
                  >
                    Hide
                  </button>
                ) : (
                  // show button
                  <button
                    className="button text-sm  border-0 text-(--accent) underline focus:bg-(--primary) focus:text-(--accent) hover:border-0"
                    onClick={() => setShowOldPass(true)}
                  >
                    Show
                  </button>
                )}
              </div>
            </div>

            {/* new password input */}
            <div className="w-full">
              <h2 className="text-sm text-(--text) font-semibold">
                New Password
              </h2>
              <div className="input flex p-0">
                <input
                  type={showNewPass ? "text" : "password"}
                  className="w-full p-2 focus:outline-0 "
                  name="newPassword"
                  id="newPassword"
                  placeholder="Enter your new password"
                  value={password.newPassword}
                  onChange={(e) =>
                    setPassword({ ...password, newPassword: e.target.value })
                  }
                />
                {showNewPass ? (
                  <button
                    className="button underline text-sm text-(--accent) border-0 focus:bg-(--primary) focus:text-(--accent) hover:border-0 "
                    onClick={() => setShowNewPass(false)}
                  >
                    Hide
                  </button>
                ) : (
                  <button
                    className="button underline text-sm border-0 text-(--accent) focus:bg-(--primary) focus:text-(--accent) hover:border-0"
                    onClick={() => setShowNewPass(true)}
                  >
                    Show
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* button */}
          <div className="w-[90%]">
            <button
              className="w-full bg-(--accent) button p-2 text-white border-2 border-(--accent) hover:text-white"
              onClick={onChangePassword}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default ChangePassword;
