import React, { useState } from "react";
import PageContainer from "../../../../components/container/PageContainer";
import MainContainer from "../../../../components/container/MainContainer";
import Logo from "../../../../components/Logo";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import axios from "axios";
import { login } from "../../../../store/AuthSlice";

function Login() {
  // hooks
  const dispatcher = useDispatch();
  const navigate = useNavigate();

  // state
  const [user, setUser] = useState({ email: "", password: "", role: "user" });

  // user login api call
  const onCustomerLogin = async () => {
    try {
      const res = await axios.post("/api/v1/user/login", user);
      console.log(res.data.data);
      dispatcher(login(res.data.data));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full min-h-screen h-screen flex justify-center items-center ">
      <div className="w-[30%] bg-(--primary) shadow-(--shadow) p-7  rounded-lg flex flex-col items-center gap-7">
        <Logo css={"flex-col gap-0"} />

        <div className="w-[90%] flex flex-col gap-3">
          {/* header */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-(--accent) ">
              Wellcome Back
            </h2>
          </div>
          {/* email input */}
          <div>
            <h2 className="font-semibold text-sm mb-1 text-(--text) ">Email</h2>
            <input
              type="email"
              name="email"
              id="email "
              placeholder="Enter your email"
              className="input"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>

          {/* password input */}
          <div>
            <h2 className="font-semibold text-sm mb-1 text-(--text) ">
              Password
            </h2>
            <input
              type="text"
              name="password"
              id="password "
              placeholder="Enter your password"
              className="input"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>

          {/* forget Password */}
          <div className=" flex  justify-end font-semibold text-sm text-(--accent) hover:underline">
            <Link>forget password?</Link>
          </div>
        </div>

        {/* buttons */}
        <div className=" w-[90%] flex flex-col gap-5">
          {/* login button */}
          <button
            className="button border-2  border-(--accent) w-full bg-(--accent) py-2 text-white hover:text-white "
            onClick={onCustomerLogin}
          >
            Login
          </button>

          {/* or line design */}
          <div className="flex items-center justify-center gap-2">
            <hr className="w-[50%] border  border-(--text-secondary) " />

            <p className="text-(--text-secondary) text-sm ">OR</p>
            <hr className="w-[50%] border border-(--text-secondary) " />
          </div>

          {/* login with otp button */}
          <button
            onClick={() => navigate("/user/login-otp")}
            className="button w-full border-2 border-(--accent-second) py-2 text-(--accent-second) hover:border-(--accent-second) hover:text-(--accent-second) font-semibold focus:bg-(--primary) "
          >
            Login with OTP
          </button>
        </div>

        {/* signup link */}
        <div>
          <p className="text-sm font-semibold text-(--text-secondary)">
            Don't have any account &nbsp;
            <Link
              className="text-(--accent-second) font-bold hover:underline"
              to="/user/signup"
            >
              register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
