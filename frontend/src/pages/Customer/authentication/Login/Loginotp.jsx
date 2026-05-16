import React, { use, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { login } from "../../../../store/AtuhSlice";

import axios from "axios";
import PageContainer from "../../../../components/Container/PageContainer";

function Loginotp() {
  // hooks
  const navigate = useNavigate();
  const dispatcher = useDispatch();
  const otpRef = useRef(null);

  // states
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  // otp input function
  const onKeyPress = (e, index) => {
    const input = Object.values(otpRef.current.children);
    if (e.key === "Backspace" && e.target.value !== "" && index > 0) {
      e.target.value = "";
      input[index - 1].focus();
      e.preventDefault();
    } else if (!isNaN(e.key) && e.target.value !== "") {
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
        navigate("/");
      }
    }
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

  // dom return
  return (
    <PageContainer>
      <div className="w-full h-full flex-center">
        <div className="flex-center flex-col w-[40%] text-2xl gap-4 p-10 bg-black rounded-2xl">
          <div className="pb-4  w-[90%] border-b-2 border-gray-700">
            <h1 className="font-bold text-center">Login</h1>
          </div>
          <div className="w-[75%] my-10">
            <div className="mb-5">
              {/* email input  */}
              <input
                type="email"
                placeholder="Enter your email id"
                name="email"
                autoComplete="off"
                id="email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* otp input */}
            {otp && (
              <div className="my-10">
                <h2 className="font-bold text-base mb-5 text-center">
                  Enter your otp
                </h2>
                <div className=" flex justify-around items-center" ref={otpRef}>
                  {/* otp 1 */}
                  <input
                    type="text"
                    className="w-[10%] input p-2 text-center aspect-square"
                    autoComplete="off"
                    name="otp"
                    id="one"
                    maxLength={1}
                    key={1}
                    onKeyDown={(e) => onKeyPress(e, 0)}
                  />

                  {/* otp 2 */}
                  <input
                    type="text"
                    className="w-[10%] input p-2 text-center aspect-square"
                    autoComplete="off"
                    name="otp"
                    maxLength={1}
                    id="two"
                    key={2}
                    onKeyDown={(e) => onKeyPress(e, 1)}
                  />

                  {/* otp 3 */}
                  <input
                    type="text"
                    className="w-[10%] input p-2 text-center aspect-square"
                    autoComplete="off"
                    name="otp"
                    maxLength={1}
                    id="three"
                    key={3}
                    onKeyDown={(e) => onKeyPress(e, 2)}
                  />

                  {/* otp 4 */}
                  <input
                    type="text"
                    className="w-[10%] input p-2 text-center aspect-square"
                    autoComplete="off"
                    name="otp"
                    maxLength={1}
                    id="four"
                    key={4}
                    onKeyDown={(e) => onKeyPress(e, 3)}
                  />

                  {/* otp 5 */}
                  <input
                    type="text"
                    className="w-[10%] input p-2 text-center aspect-square"
                    autoComplete="off"
                    name="otp"
                    maxLength={1}
                    id="five"
                    key={5}
                    onKeyDown={(e) => onKeyPress(e, 4)}
                  />

                  {/* otp 6 */}
                  <input
                    type="text"
                    className="w-[10%] input p-2 text-center aspect-square"
                    autoComplete="off"
                    name="otp"
                    maxLength={1}
                    id="six"
                    key={6}
                    onKeyDown={(e) => onKeyPress(e, 5)}
                  />
                </div>
              </div>
            )}
            <div className="w-full flex-center">
              {otp ? (
                // verify otp button
                <button className="button" onClick={otpValidate}>
                  Verify otp
                </button>
              ) : (
                // send otp button
                <button className="button" onClick={sendOtp}>
                  Send Otp
                </button>
              )}
            </div>
          </div>

          {/* useful links */}
          <p className="text-sm text-gray-600">
            Don't have any account &nbsp;
            <Link className="text-blue-700" to="/user">
              register here
            </Link>
          </p>
          <p className="text-sm text-gray-600">
            Login with password &nbsp;
            <Link className="text-blue-700" to="/user/login">
              Click here
            </Link>
          </p>
        </div>
      </div>
    </PageContainer>
  );
}

export default Loginotp;
