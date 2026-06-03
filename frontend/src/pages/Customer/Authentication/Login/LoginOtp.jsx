import React, { useRef, useState } from "react";
import PageContainer from "../../../../components/container/PageContainer";
import Logo from "../../../../components/Logo";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../../../store/AuthSlice";
import { setUserData } from "../../../../store/Customer/CustomerSlice";

function LoginOtp() {
  // hooks
  const navigate = useNavigate();
  const otpRef = useRef(null);
  const dispatcher = useDispatch();

  // state
  const [email, setEmail] = useState();
  const [otp, setOtp] = useState("");

  // otp input function
  const onOtpInput = (e, index) => {
    const input = Object.values(otpRef.current.children);

    // on backpress action
    if (e.key === "Backspace" && index >= 0) {
      e.target.value = "";
      input[index - 1].focus();
      e.target.classList.remove("border-(--accent)");

      e.preventDefault();
    }
    // on number(otp digit) input action
    else if (!isNaN(e.key) && e.target.value !== "" && index < 5) {
      e.target.classList.add("border-(--accent)");
      input[index + 1].focus();
    }
  };

  // otp verification function
  const otpValidate = async () => {
    const input = Object.values(otpRef.current.children);
    let userOtp = "";
    await input.map((item) => {
      userOtp = userOtp + item.value;
    });
    if (otp === userOtp) {
      const res = await axios.post("/api/v1/user/auth/login-otp", { email });
      if (res.data.data.role === "user") {
        dispatcher(login(res.data.data));
        dispatcher(setUserData(res.data.data));
        navigate("/");
      }
    }
    console.log(userOtp);
  };

  // api call to send otp
  const sendOtp = async () => {
    try {
      const res = await axios.post("/api/v1/user/auth/login-otp-send", {
        email,
      });
      setOtp(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // dom
  return (
    <div className="w-full min-h-screen h-screen flex justify-center items-center ">
      <div className="w-[30%] bg-(--primary) shadow-(--shadow) py-10 px-5 rounded-lg flex flex-col items-center gap-7">
        {/* logo */}
        <Logo css={"flex-col"} />

        {/* input box */}
        <div className="w-[90%] flex flex-col gap-5">
          {/* header */}
          <div className="text-center flex flex-col gap-2 ">
            <h2 className="text-2xl font-bold text-(--accent)">
              Login with OTP
            </h2>
            {otp ? (
              <div className="text-center">
                <p className="text-sm text-(--text-secondary)">
                  We've sent a 6-digit code to
                </p>
                <p className="text-xs font-semibold">{email}</p>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-sm text-(--text-secondary)">
                  We'll send a one-time password to your email
                </p>
              </div>
            )}
          </div>
          {otp ? (
            // otp input box
            <div className="flex flex-col gap-5">
              {/* otp header */}
              <h2 className=" text-sm font-semibold text-center text-(--text)">
                One-Time Password
              </h2>

              {/* otp input */}
              <div
                className=" flex justify-center gap-2  items-center"
                ref={otpRef}
              >
                {/* otp input 1 */}
                <input
                  type="text"
                  className="w-[7vh] h-[7vh] input  text-center focus:border-(--accent) text-2xl font-bold "
                  autoComplete="off"
                  name="otp"
                  id="one"
                  inputMode="numeric"
                  pattern="\d*"
                  maxLength={1}
                  onKeyDown={(e) => {
                    onOtpInput(e, 0);
                  }}
                  onPaste={(e) => {
                    const pasted = e.clipboardData.getData("text");
                    if (!/^[0-9]$/.test(pasted)) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => {
                    e.target.value = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 1);
                  }}
                />
                {/* otp input 2 */}
                <input
                  type="text"
                  className="w-[7vh] h-[7vh] input  text-center focus:border-(--accent) text-2xl font-bold "
                  autoComplete="off"
                  name="otp"
                  id="one"
                  inputMode="numeric"
                  pattern="\d*"
                  maxLength={1}
                  onKeyDown={(e) => {
                    onOtpInput(e, 1);
                  }}
                  onPaste={(e) => {
                    const pasted = e.clipboardData.getData("text");
                    if (!/^[0-9]$/.test(pasted)) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => {
                    e.target.value = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 1);
                  }}
                />
                {/* otp input 3 */}
                <input
                  type="text"
                  className="w-[7vh] h-[7vh] input  text-center focus:border-(--accent) text-2xl font-bold"
                  autoComplete="off"
                  name="otp"
                  id="one"
                  inputMode="numeric"
                  pattern="\d*"
                  maxLength={1}
                  onKeyDown={(e) => {
                    onOtpInput(e, 2);
                  }}
                  onPaste={(e) => {
                    const pasted = e.clipboardData.getData("text");
                    if (!/^[0-9]$/.test(pasted)) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => {
                    e.target.value = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 1);
                  }}
                />
                {/* otp input 4 */}
                <input
                  type="text"
                  className="w-[7vh] h-[7vh] input  text-center focus:border-(--accent) text-2xl font-bold"
                  autoComplete="off"
                  name="otp"
                  id="one"
                  inputMode="numeric"
                  pattern="\d*"
                  maxLength={1}
                  onKeyDown={(e) => {
                    onOtpInput(e, 3);
                  }}
                  onPaste={(e) => {
                    const pasted = e.clipboardData.getData("text");
                    if (!/^[0-9]$/.test(pasted)) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => {
                    e.target.value = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 1);
                  }}
                />
                {/* otp input 5 */}
                <input
                  type="text"
                  className="w-[7vh] h-[7vh] input  text-center focus:border-(--accent) text-2xl font-bold"
                  autoComplete="off"
                  name="otp"
                  id="one"
                  inputMode="numeric"
                  pattern="\d*"
                  maxLength={1}
                  onKeyDown={(e) => {
                    onOtpInput(e, 4);
                  }}
                  onPaste={(e) => {
                    const pasted = e.clipboardData.getData("text");
                    if (!/^[0-9]$/.test(pasted)) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => {
                    e.target.value = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 1);
                  }}
                />
                {/* otp input 6 */}
                <input
                  type="text"
                  className="w-[7vh] h-[7vh] input  text-center focus:border-(--accent) text-2xl font-bold"
                  autoComplete="off"
                  name="otp"
                  id="one"
                  inputMode="numeric"
                  pattern="\d*"
                  maxLength={1}
                  onKeyDown={(e) => {
                    onOtpInput(e, 5);
                  }}
                  onPaste={(e) => {
                    const pasted = e.clipboardData.getData("text");
                    if (!/^[0-9]$/.test(pasted)) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => {
                    e.target.value = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 1);
                  }}
                />
              </div>

              {/* resend otp  */}
              <div className="text-center">
                <p className="text-sm text-(--text-secondary)">
                  Didn't receive the code?&nbsp;
                  <span
                    className="font-bold text-(--accent) underline"
                    onClick={sendOtp}
                  >
                    Resend
                  </span>
                </p>
              </div>
            </div>
          ) : (
            // email input
            <div>
              <h2 className="font-semibold text-sm mb-1 text-(--text)">
                Email
              </h2>
              <input
                type="text"
                name="email "
                id="email"
                placeholder="Enter your email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* buttons */}
        {otp ? (
          <div className="w-[90%]">
            <button
              className="button w-full border-2 border-(--accent) bg-(--accent) text-white py-2 hover:text-white "
              onClick={otpValidate}
            >
              Verify & Login
            </button>
          </div>
        ) : (
          <div className=" w-[90%] flex flex-col gap-5">
            {/* login button */}
            <button
              className="button border-2 border-(--accent) w-full bg-(--accent) py-2 text-white hover:text-white "
              onClick={sendOtp}
            >
              Send OTP
            </button>

            {/* or line design */}
            <div className="flex items-center justify-center gap-2">
              <hr className="w-[50%] border  border-(--text-secondary) " />

              <p className="text-(--text-secondary) text-sm ">OR</p>
              <hr className="w-[50%] border border-(--text-secondary) " />
            </div>

            {/* login with otp button */}
            <button
              onClick={() => navigate("/user")}
              className="button w-full border-2 border-(--accent-second) py-2 text-(--accent-second) font-bold hover:border-(--accent-second) hover:text-(--accent-second) focus:bg-(--primary) focus:text-(--accent) focus:border-(--accent)"
            >
              Login with password
            </button>
          </div>
        )}

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

export default LoginOtp;
