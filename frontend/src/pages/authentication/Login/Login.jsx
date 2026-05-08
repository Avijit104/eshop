import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../store/AtuhSlice";
import axios from "axios";

function Login() {
  // hooks
  const navigate = useNavigate();
  const dispatcher = useDispatch();

  // states
  const [user, setUser] = useState({ email: "", password: "" });
  const isLogin = useSelector((state) => state.auth.isLogin);

  // api call for password login
  const onLogin = async () => {
    try {
      const res = await axios.post("/api/v1/auth/login", user);
      dispatcher(login(res.data.data));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  // dom return
  return (
    <div className="main flex-center">
      <div className="flex-center flex-col w-[40%] text-2xl gap-4 p-10 bg-black rounded-2xl">
        <h1 className="font-bold">Login</h1>
        <div className="w-[75%] my-10">
          {/* email input */}
          <div className="mb-5">
            <input
              type="email"
              placeholder="Enter your Email id"
              name="email"
              autoComplete="off"
              id="email"
              className="input"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>

          {/* password input */}
          <div className="mb-5">
            <input
              type="password"
              placeholder="Enter your Password"
              autoComplete="off"
              name="pass"
              id="pass"
              className="input"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>

          <div className="w-full flex-center">
            {/* login button  */}
            <button className="button" onClick={onLogin}>
              Login
            </button>
          </div>
        </div>
        {/* useful links */}
        <p className="text-sm text-gray-600">
          Don't have any account &nbsp;
          <Link className="text-blue-700" to="/signup">
            register here
          </Link>
        </p>
        <p className="text-sm text-gray-600">
          Login with otp &nbsp;
          <Link className="text-blue-700" to="/loginotp">
            Click here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
