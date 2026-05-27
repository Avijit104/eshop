import React, { useRef, useState } from "react";
import PageContainer from "../../../../components/container/PageContainer";
import Logo from "../../../../components/Logo";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { login } from "../../../../store/AuthSlice";

function Signup() {
  // hooks
  const dispatcher = useDispatch();
  const navigate = useNavigate();
  const otpRef = useRef(null);

  // states
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [gender, setGender] = useState("");
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phno: "",
    gender: "",
    password: "",
  });

  // send otp api call function
  const sendOtp = async () => {
    try {
      if (user.email) {
        const res = await axios.post("/api/v1/user/auth/send-otp", {
          email: user.email,
        });
        console.log(res.data.data);
        setOtp(res.data.data);
      } else {
        throw new Error("email is required");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // otp input function
  const onOtpInput = (e, index) => {
    const input = Object.values(otpRef.current.children);

    // on backpress action
    if (e.key === "Backspace" && index >= 0) {
      e.target.value = "";
      e.target.classList.remove("border-(--accent)");
      input[index - 1].focus();
      e.preventDefault();
    }
    // on number(otp digit) input action
    else if (!isNaN(e.key) && e.target.value !== "" && index < 5) {
      e.target.classList.add("border-(--accent)");

      input[index + 1].focus();
    }
  };

  // otp verification function
  const onOtpVerification = () => {
    setOtpVerified(true);
    const input = Object.values(otpRef.current.children);
    let otpUser = "";
    input.map((item) => {
      otpUser = otpUser + item.value;
    });
    if (otp === otpUser) {
      setOtpVerified(true);
    }
  };

  // signup api call
  const onSignUp = async () => {
    // try {
    //   const res = await axios.post("/api/v1/user/auth/signup", user);
    //   console.log(res.data.data);
    //   dispatcher(login(res.data.data));
    //   navigate("/");
    // } catch (error) {
    //   console.log(error);
    // }
    console.log(user);
  };

  // dom
  return (
    <div className=" min-h-screen w-full flex justify-center items-center py-10 ">
      <div className="w-[30%] flex flex-col items-center bg-(--primary) px-5 py-10 shadow-(--shadow) rounded-lg gap-7">
        {/* logo */}
        <Logo css={"flex-col"} />

        {/* progeress bar */}
        <div className="w-[90%] flex gap-2 ">
          <div className={`h-[0.5vh] bg-(--accent) w-[35%] rounded-xl`}></div>
          <div
            className={`h-[0.5vh]  w-[35%] rounded-xl ${otp ? "bg-(--accent)" : "bg-(--accent-shade)"}`}
          ></div>
          <div
            className={`h-[0.5vh] w-[35%] rounded-xl ${otpVerified ? "bg-(--accent)" : "bg-(--accent-shade)"}`}
          ></div>
        </div>

        {/* input form */}
        {otpVerified ? (
          <div className="w-[90%] flex flex-col gap-7">
            {/* signup form header */}
            <div className="w-full text-center flex gap-2 flex-col">
              <h2 className="text-2xl text-(--accent) font-bold">
                Complete Your profile
              </h2>
              <div className="text-center">
                <p className="text-sm text-(--text-secondary) ">
                  Just a few more details to get started
                </p>
              </div>
            </div>

            {/* email verified status */}
            <div className="w-full bg-(--accent-second) text-center p-2 rounded-sm">
              <p className="text-white text-sm font-semibold">
                Email verified successfully
              </p>
            </div>

            {/* signup form input box  */}
            <div className="w-full flex flex-col gap-2">
              {/* name input box */}
              <div className="flex gap-2">
                {/* first name */}
                <div className="w-[50%]">
                  <h2 className="text-sm text-(--text) font-semibold">
                    First name
                  </h2>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="First name"
                    className="input"
                    value={user.firstName}
                    onChange={(e) =>
                      setUser({ ...user, firstName: e.target.value })
                    }
                  />
                </div>

                {/* last name */}
                <div className="w-[50%]">
                  <h2 className="text-sm text-(--text) font-semibold">
                    Last name
                  </h2>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Last name"
                    className="input"
                    value={user.lastName}
                    onChange={(e) =>
                      setUser({ ...user, lastName: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* email */}
              <div>
                <h2 className="text-sm text-(--text) font-semibold">
                  Email Address
                </h2>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="input"
                  value={user.email}
                  readOnly
                />
              </div>

              {/* password */}
              <div>
                <h2 className="text-sm text-(--text) font-semibold">
                  Password
                </h2>
                <div className="flex input p-0  ">
                  <input
                    type={`${showPass ? "text" : "password"}`}
                    name="password"
                    id="password"
                    placeholder="Enter your Password"
                    value={user.password}
                    className="w-full p-2   focus:outline-0"
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                  />

                  {/* hide and show password button */}
                  {showPass ? (
                    // hide button
                    <button
                      className="button text-sm  border-0 text-(--accent) underline focus:bg-(--primary) focus:text-(--accent) hover:border-0"
                      onClick={() => setShowPass(false)}
                    >
                      Hide
                    </button>
                  ) : (
                    // show button
                    <button
                      className="button text-sm  border-0 text-(--accent) underline focus:bg-(--primary) focus:text-(--accent) hover:border-0"
                      onClick={() => setShowPass(true)}
                    >
                      Show
                    </button>
                  )}
                </div>
                <p className="text-xs text-(--text-secondary)">
                  Must be at least 8 characters
                </p>
              </div>

              {/* phone number */}
              <div>
                <h2 className="text-sm text-(--text) font-semibold">
                  Phone Number
                </h2>
                <input
                  type="text"
                  name="phno"
                  id="phno"
                  placeholder="Enter your phone number"
                  className="input"
                  value={user.phno}
                  onChange={(e) => {
                    e.target.value = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 10);
                    setUser({ ...user, phno: e.target.value });
                  }}
                />
              </div>

              {/* gender  */}
              <div>
                <h2 className="text-sm text-(--text) font-semibold">Gender </h2>
                <div className="flex input justify-around ">
                  {/* male */}
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gender"
                      id="male"
                      required
                      className="appearance-none w-[1.5vh] aspect-square rounded-2xl  scale-125 bg-(--primary)  border-2 checked:bg-(--accent) checked:border-0"
                      onClick={() => setUser({ ...user, gender: "male" })}
                    />
                    <p className="text-sm text(--text) font-semibold">Male</p>
                  </div>

                  {/* felmale  */}
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gender"
                      id="female"
                      required
                      onClick={() => setUser({ ...user, gender: "female" })}
                      className="appearance-none w-[1.5vh] aspect-square rounded-2xl  scale-125 bg-(--primary)  border-2 checked:bg-(--accent) checked:border-0"
                    />
                    <p className="text-sm text(--text) font-semibold">Female</p>
                  </div>

                  {/* other */}
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gender"
                      required
                      id="other"
                      className="appearance-none w-[1.5vh] aspect-square rounded-2xl  scale-125 bg-(--primary)  border-2 checked:bg-(--accent) checked:border-0"
                      onClick={() => setUser({ ...user, gender: "other" })}
                    />
                    <p className="text-(--text) text-sm font-semibold">Other</p>
                  </div>
                </div>
              </div>
            </div>

            {/* sign up button */}
            <div className="w-full">
              <button
                className="button w-full text-white p-2 bg-(--accent) border-2 border-(--accent) hover:text-white"
                onClick={onSignUp}
              >
                SignUp
              </button>
            </div>
          </div>
        ) : otp ? (
          // otp verification
          <div className="w-[90%] flex flex-col gap-7">
            {/* otp input header */}
            <div className="w-full text-center flex gap-2 flex-col">
              <h2 className="text-2xl text-(--accent) font-bold">
                Verify Email
              </h2>
              <div className="">
                <p className="text-sm text-(--text-secondary)">
                  We've sent a 6-digit code to
                </p>
                <p className="text-xs text-(text) font-semibold">
                  {user.email}
                </p>
              </div>
            </div>

            {/* otp input box */}
            <div className="w-full flex flex-col gap-3">
              <h3 className="text-sm font-semibold text-(--text) text-center ">
                Enter verification code
              </h3>
              <div
                className="flex justify-center items-center gap-2"
                ref={otpRef}
              >
                {/* otp input 1 */}
                <input
                  type="text"
                  className="w-[7vh] h-[7vh] input  text-center focus:border-(--accent)  text-2xl font-bold"
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
                  className="w-[7vh] h-[7vh] input  text-center focus:border-(--accent)  text-2xl font-bold"
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
                  className="w-[7vh] h-[7vh] input  text-center focus:border-(--accent)  text-2xl font-bold"
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
                  className="w-[7vh] h-[7vh] input  text-center focus:border-(--accent)  text-2xl font-bold"
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
                  className="w-[7vh] h-[7vh] input  text-center focus:border-(--accent)  text-2xl font-bold"
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
                  className="w-[7vh] h-[7vh] input  text-center focus:border-(--accent) text-2xl font-bold "
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
            </div>

            {/* resend otp  */}
            <div className="text-center">
              <p className="text-sm text-(--text-secondary)">
                Didn't receive the code?&nbsp;
                <span className="font-bold text-(--accent) underline">
                  Resend
                </span>
              </p>
            </div>

            {/* button box */}
            <div>
              <button
                className="button w-full text-white bg-(--accent) p-2 border-2 border-(--accent) hover:text-white "
                onClick={onOtpVerification}
              >
                Verify Email
              </button>
            </div>
          </div>
        ) : (
          // email input for otp verification
          <div className="w-[90%] flex flex-col  gap-7">
            {/* email input header */}
            <div className="w-full text-center flex flex-col gap-2">
              <h2 className="text-2xl text-(--accent) font-bold">
                Create Account
              </h2>
              <div className="">
                <p className="text-sm text-(--text-secondary)">
                  First verify your email address
                </p>
              </div>
            </div>

            {/* email input */}
            <div>
              <h3 className="text-sm text-(--text) font-semibold">
                Email Address
              </h3>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email address "
                className="input"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>

            {/* otp send button  */}
            <div className="w-full text-center">
              <button
                className="w-full button bg-(--accent) border-2 border-(--accent) py-2 text-white hover:text-white"
                onClick={sendOtp}
              >
                Send OTP
              </button>
            </div>
          </div>
        )}

        <div className="w-[90%]">
          {otp && !otpVerified ? (
            <div className="w-full text-center">
              <p
                className="text-sm text-(--text-secondary) font-bold underline "
                onClick={() => {
                  setOtp("");
                }}
              >
                Change email address
              </p>
            </div>
          ) : (
            <div>
              <p className="text-sm text-(--text-secondary) text-center font-semibold">
                Already have an account?&nbsp;
                <Link
                  className=" text-(--accent-second) font-bold hover:underline"
                  to={"/user"}
                >
                  Login here
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Signup;
