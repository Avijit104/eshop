import React, { useRef, useState } from "react";
import PageContainer from "../../../../components/container/PageContainer";
import Logo from "../../../../components/Logo";
import { Link, useNavigate } from "react-router";

function LoginOtp() {
  // hooks
  const navigate = useNavigate();
  const otpRef = useRef(null);

  // state
  const [email, setEmail] = useState();
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
    // if (otp === userOtp) {
    //   const res = await axios.post("/api/v1/user/auth/login-otp", { email });
    //   if (res.data.data.role === "user") {
    //     dispatcher(login(res.data.data));
    //     navigate("/");
    //   }
    // }
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
      <div className="w-[30%] bg-(--primary) shadow-(--shadow) py-5 px-5 rounded-lg flex flex-col items-center gap-7">
        {/* logo */}
        <Logo css={"flex-col"} />

        {/* header */}
        <div className="w-[95%] text-center p-1 border-b-2 border-(--secondary)">
          <h2 className="text-2xl font-bold text-(--secondary)">
            Login with OTP
          </h2>
        </div>

        {/* input box */}
        <div className="w-[95%]">
          {otp ? (
            // otp input box
            <div>
              {/* otp header */}
              <h2 className="font-bold text-sm mb-2 text-center text-(--secondary)">
                One-Time Password
              </h2>

              {/* otp input */}
              <div className=" flex justify-between  items-center" ref={otpRef}>
                {/* otp 1 */}
                <input
                  type="text"
                  className="w-[3vw] h-[3vw] input p-2 text-center aspect-square"
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
                  className="w-[3vw] h-[3vw] input p-2 text-center aspect-square"
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
                  className="w-[3vw] h-[3vw] input p-2 text-center aspect-square"
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
                  className="w-[3vw] h-[3vw] input p-2 text-center aspect-square"
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
                  className="w-[3vw] h-[3vw] input p-2 text-center aspect-square"
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
                  className="w-[3vw] h-[3vw] input p-2 text-center aspect-square"
                  autoComplete="off"
                  name="otp"
                  maxLength={1}
                  id="six"
                  key={6}
                  onKeyDown={(e) => onKeyPress(e, 5)}
                />
              </div>
            </div>
          ) : (
            // email input
            <div>
              <h2 className="font-bold text-sm mb-1 text-(--secondary)">
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
          <div className="w-[95%]">
            <button
              className="button w-full border-2 border-(--accent) bg-(--accent) text-white py-2 hover:text-white "
              onClick={otpValidate}
            >
              Verify & Login
            </button>
          </div>
        ) : (
          <div className=" w-[95%] flex flex-col gap-2">
            {/* login button */}
            <button
              className="button border-2 border-(--accent) w-full bg-(--accent) py-2 text-white hover:text-white "
              onClick={sendOtp}
            >
              Send OTP
            </button>

            {/* or line design */}
            <div className="flex items-center justify-center gap-2">
              <hr className="w-[50%] border  border-(--accent-secondary) " />

              <p className="text-(--accent-secondary) text-sm ">OR</p>
              <hr className="w-[50%] border border-(--accent-secondary) " />
            </div>

            {/* login with otp button */}
            <button
              onClick={() => navigate("/user")}
              className="button w-full border-2 border-(--accent) py-2 text-(--accent) focus:bg-(--primary) focus:text-(--accent) focus:border-(--accent)"
            >
              Login with password
            </button>
          </div>
        )}

        {/* signup link */}
        <div>
          <p className="text-sm font-bold text-(--accent-secondary)">
            Don't have any account &nbsp;
            <Link className="text-(--accent)" to="/user/signup">
              register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginOtp;
