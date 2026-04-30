import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import RegistrationForm from "./RegistrationForm";

function SignUp() {
  const [email, setemail] = useState("");
  const [otp, setOtp] = useState("");
  const [isVerified, setVerified] = useState(false);
  const navigate = useNavigate();
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
      setVerified(true);
    }
  };

  const sendOtp = async () => {
    try {
      const res = await axios.post("/api/v1/auth/send-otp", { email });
      setOtp(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="main flex-center flex-col ">
      <div className="flex-center flex-col w-[40%] text-2xl gap-10  bg-black rounded-2xl p-5">
        <h1 className="font-bold">Signup</h1>
        {isVerified ? (
          <div className="w-[75%]">
            <RegistrationForm email={email} />
          </div>
        ) : (
          <div className="w-[75%]">
            <div>
              <h2 className="font-bold text-base mb-2">Email : </h2>
              <input
                type="email"
                placeholder="Email"
                autoComplete="off"
                name="email"
                id="email"
                className="input"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
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
            {otp ? (
              <div className="w-full flex-center ">
                <button className="button" onClick={otpValidate}>
                  Validate
                </button>
              </div>
            ) : (
              <div className="w-full flex-center">
                <button className="button" onClick={sendOtp}>
                  Send Otp
                </button>
              </div>
            )}
          </div>
        )}
        <p className="text-sm text-gray-600">
          Already have an account &nbsp;
          <Link className="text-blue-700" to="/login">
            login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
