import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

function SignUp() {
  const [user, setUser] = useState({ email: "", username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSignUp = async () => {
    try {
      const res = await axios.post("/api/v1/user/signup", user);
      console.log("response", res.data);
      console.log(res.data.message);
      navigate("/user/login");
    } catch (error) {
      setError(true);
      if (error.status === 422) {
        setError("signup failed: invalid data");
      }
    }
    console.log(user);
  };
  return (
    <div className="main flex-center flex-col">
      <div className="flex-center flex-col w-[40%] text-2xl gap-10 p-5 bg-(--innerBox) rounded-2xl">
        <h1>Signup</h1>
        <div className="w-[60%]">
          <input
            type="email"
            placeholder="Email"
            name="email"
            id="email"
            className="input"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Username"
            name="username"
            id="username"
            className="input"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            name="pass"
            id="pass"
            className="input"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

          <div className="w-full flex-center p-4">
            <button className="button" onClick={onSignUp}>
              Signup
            </button>
          </div>
        </div>
      </div>
      {error ? (
        <div className="p-1 text-center text-red-700 bg-(--innerBox) w-[40%] m-4 rounded-xl">
          <p>{error}</p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default SignUp;
