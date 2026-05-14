import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../../store/AtuhSlice";
import axios from "axios";

function SellerLogin() {
  // hooks
  const navigate = useNavigate();
  const dispatcher = useDispatch();

  // states
  const [user, setUser] = useState({ email: "", password: "" });

  // seller login api call
  const onSellerLogin = async () => {
    try {
      const res = await axios.post("/api/v1/seller/login", user);
      if (res.data.data.role === "seller") {
        console.log(res.data.data);
        dispatcher(login(res.data.data));
        navigate("/seller");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // dom
  return (
    <div className="main flex-center">
      <div className="flex-center flex-col w-[40%] text-2xl gap-2 p-10 bg-black rounded-2xl">
        <div className="pb-2  w-[75%] border-b-2 border-gray-700">
          <h1 className="font-bold text-center">Seller Login</h1>
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
            <button className="button" onClick={onSellerLogin}>
              Login
            </button>
          </div>
        </div>

        {/* useful links */}
        <p className="text-sm text-gray-600">
          Don't have any account &nbsp;
          <Link className="text-blue-700" to="/seller/signup">
            register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SellerLogin;
