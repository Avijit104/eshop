import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";

function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const onLogin = async () => {
    try {
      const res = await axios.post("/api/v1/user/login", user);
      console.log(res.data);
      // navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="main flex-center">
      <div className="flex-center flex-col w-[40%] text-2xl gap-10 p-5 bg-(--innerBox) rounded-2xl">
        <h1>Login</h1>
        <div className="w-[60%]">
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

          <div className="w-full flex-center p-4">
            <button className="button" onClick={onLogin}>
              Signup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
