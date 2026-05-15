import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import axios from "axios";
import RegistrationForm from "./RegistrationForm";
import PageContainer from "../../../../components/Container/PageContainer";

function SignUp() {
  // hooks
  const navigate = useNavigate();
  const otpRef = useRef(null);

  // states
  const [email, setemail] = useState("");
  const [change, setChange] = useState(false);
  const [otp, setOtp] = useState("");
  const [isVerified, setVerified] = useState(false);

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

  // change email function
  const changeEmail = () => {
    setemail("");
    setOtp("");
    setChange(false);
  };

  // otp verification function
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

  // api call to send otp
  const sendOtp = async () => {
    try {
      const res = await axios.post("/api/v1/auth/send-otp", { email });
      setOtp(res.data.data);
      setChange(true);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // dom return
  return (
    <PageContainer>
      <div className="w-full h-full flex-center flex-col ">
        {isVerified ? (
          <div className="flex-center flex-col w-[60%] text-2xl gap-7  bg-black rounded-2xl p-10">
            <div className="pb-4  w-[75%] border-b-2 border-gray-700">
              <h1 className="font-bold text-center">Signup</h1>
            </div>
            {/* registration form input */}
            <div className="w-[75%]  ">
              <RegistrationForm email={email} />
            </div>
          </div>
        ) : (
          <div className="flex-center flex-col w-[40%] text-2xl gap-10   bg-black rounded-2xl p-10">
            <h1 className="font-bold">Signup</h1>
            <div className="w-[75%]">
              {/* email input */}
              <div className="mb-5">
                <input
                  type="email"
                  placeholder="Enter your Email Id"
                  autoComplete="off"
                  name="email"
                  id="email"
                  className="input"
                  readOnly={change}
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
              </div>
              {/* otp input */}
              {otp && (
                <div className="my-10 border-2 p-5 rounded-2xl border-blue-700">
                  <h2 className="font-bold text-base mb-15 text-center p-2 border-b border-gray-700">
                    Enter your otp
                  </h2>
                  {/* six input box to take otp input */}
                  <div
                    className=" flex justify-around items-center"
                    ref={otpRef}
                  >
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
              {otp ? (
                <div className="w-full flex-center gap-5 ">
                  {/* change email button */}
                  <button className="button" onClick={changeEmail}>
                    Change email
                  </button>
                  {/* otp verification function */}
                  <button className="button" onClick={otpValidate}>
                    Verify otp
                  </button>
                </div>
              ) : (
                <div className="w-full flex-center">
                  {/* send otp button */}
                  <button className="button" onClick={sendOtp}>
                    Send Otp
                  </button>
                </div>
              )}
            </div>

            {/* login page link */}
            <p className="text-sm text-gray-600">
              Already have an account &nbsp;
              <Link className="text-blue-700" to="/user/login">
                login here
              </Link>
            </p>
          </div>
        )}
      </div>
    </PageContainer>
  );
}

export default SignUp;
