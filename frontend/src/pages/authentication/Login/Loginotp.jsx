import React, { use, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { login } from "../../../store/AtuhSlice";
import axios from "axios";

function Loginotp() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const dispatcher = useDispatch();
  const otpRef = useRef(null);

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

  const otpValidate = async () => {
    const input = Object.values(otpRef.current.children);
    let userOtp = "";
    await input.map((item) => {
      userOtp = userOtp + item.value;
    });
    if (otp === userOtp) {
      const res = await axios.post("/api/v1/auth/login-otp", { email });
      dispatcher(login(res.data.data));
      navigate("/");
    }
  };

  const sendOtp = async () => {
    try {
      const res = await axios.post("/api/v1/auth/login-otp-send", { email });
      setOtp(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main flex-center">
      <div className="flex-center flex-col w-[40%] text-2xl gap-4 p-10 bg-black rounded-2xl">
        <h1 className="font-bold">Login</h1>
        <div className="w-[75%] my-10">
          <h2 className="text-base font-bold mb-1">Email :</h2>
          <input
            type="email"
            placeholder="Email"
            name="email"
            autoComplete="off"
            id="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {otp && (
            <div>
              <h2 className="font-bold text-base mb-2">Otp : </h2>
              <div className=" flex justify-around items-center" ref={otpRef}>
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
              <button className="button" onClick={otpValidate}>
                Validate
              </button>
            ) : (
              <button className="button" onClick={sendOtp}>
                Send Otp
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginotp;
