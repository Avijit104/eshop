import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../store/AtuhSlice";

function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatcher = useDispatch();
  const isLogin = useSelector((state) => state.auth.isLogin);
  const onLogin = async () => {
    try {
      const res = await axios.post("/api/v1/auth/login", user);
      console.log(res.data.data._id);
      dispatcher(login(res.data.data));
      navigate("/");
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
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <h2 className="text-base font-bold mb-1">Password :</h2>

          <input
            type="password"
            placeholder="Password"
            autoComplete="off"
            name="pass"
            id="pass"
            className="input"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

          <div className="w-full flex-center">
            <button className="button" onClick={onLogin}>
              Login
            </button>
          </div>
        </div>
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
