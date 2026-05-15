import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../../store/AtuhSlice";
import axios from "axios";
import PageContainer from "../../../../components/Container/PageContainer";

function Login() {
  // hooks
  const navigate = useNavigate();
  const dispatcher = useDispatch();

  // states
  const [user, setUser] = useState({ email: "", password: "" });

  // api call for password login
  const onLogin = async () => {
    try {
      const res = await axios.post("/api/v1/user/login", user);
      console.log(res.data.data);
      dispatcher(login(res.data.data));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  // dom return
  return (
    <PageContainer>
      <div className="w-full h-full flex-center">
        <div className="flex-center flex-col w-[40%] text-2xl gap-2 p-10 bg-black rounded-2xl">
          <div className="pb-4  w-[75%] border-b-2 border-gray-700">
            <h1 className="font-bold text-center">Login</h1>
          </div>
          <div className="w-[75%] my-5">
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
            <Link className="text-blue-700" to="/user">
              register here
            </Link>
          </p>
          <p className="text-sm text-gray-600">
            Login with otp &nbsp;
            <Link className="text-blue-700" to="/user/loginotp">
              Click here
            </Link>
          </p>
        </div>
      </div>
    </PageContainer>
  );
}

export default Login;
