import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";

function SignUp() {
  const [user, setUser] = useState({ email: "", username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSignUp = async () => {
    try {
      const res = await axios.post("/api/v1/auth/signup", user);
      console.log("response", res.data);
      console.log(res.data.message);
      navigate("/login");
    } catch (error) {
      setError(true);
      if (error.status === 422) {
        setError("signup failed: invalid data");
      }
    }
    console.log(user);
  };
  return (
    <div className="main flex-center flex-col ">
      <div className="flex-center flex-col w-[40%] text-2xl gap-10  bg-black rounded-2xl p-10">
        <h1 className="font-bold">Signup</h1>
        <div className="w-[75%]">
          <input
            type="email"
            placeholder="Email"
            autoComplete="off"
            name="email"
            id="email"
            className="input"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Username"
            autoComplete="off"
            name="username"
            id="username"
            className="input"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
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

          <div className="w-full flex-center ">
            <button className="button" onClick={onSignUp}>
              Signup
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-600">
          Already have an account &nbsp;
          <Link className="text-blue-700" to="/login">
            login here
          </Link>
        </p>
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
