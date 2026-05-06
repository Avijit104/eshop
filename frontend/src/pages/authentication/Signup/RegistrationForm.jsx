import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router";

function RegistrationForm(email) {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: email.email,
    username: "",
    gender: "",
    phno: "",
    password: "",
  });

  const onSignup = async () => {
    try {
      const res = await axios.post("/api/v1/auth/signup", user);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      {/* name */}
      <div className="flex justify-baseline gap-5 border mb-5">
        {/* first name */}
        <div className="w-[50%] ">
          <h2 className="text-base font-bold mb-2">First Name :</h2>
          <input
            type="text"
            name="username"
            id="username"
            className="input"
            placeholder="Enter your username"
            autoComplete="off"
            value={user.firstName}
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          />
        </div>

        {/* last name */}
        <div className="w-[50%]">
          <h2 className="text-base font-bold mb-2">Last Name :</h2>
          <input
            type="text"
            name="username"
            id="username"
            className="input"
            placeholder="Enter your username"
            value={user.lastName}
            autoComplete="off"
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          />
        </div>
      </div>

      {/* email */}
      <div className="flex justify-baseline items-baseline-last gap-5 border mb-5">
        <div className="w-[60%] ">
          <h2 className="text-base font-bold mb-2">Email :</h2>
          <input
            type="email"
            name="email"
            id="email"
            value={email.email}
            readOnly
            className="input mb-0"
          />
        </div>

        {/* change email button */}
        <button className="button" onClick={() => navigate(0)}>
          Change
        </button>
      </div>

      {/* password */}
      <div className="w-[60%] border mb-5">
        <h2 className="text-base font-bold mb-2">Password :</h2>
        <input
          type="text"
          name="password"
          id="password"
          className="input"
          placeholder="Enter your password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
      </div>

      {/* gender */}
      <div className="border mb-5 w-[60%]">
        <h2 className="text-base font-bold mb-2">Gender: </h2>
        <div className=" flex-center input justify-around">
          {/* male */}
          <div className="flex-center gap-[10%]">
            <input
              type="radio"
              name="gender"
              id="gender"
              onClick={(e) => setUser({ ...user, gender: "male" })}
            />
            <p className="text-base ">Male</p>
          </div>

          {/* female */}
          <div className="flex-center gap-[10%]">
            <input
              type="radio"
              name="gender"
              id="gender"
              onClick={(e) => setUser({ ...user, gender: "female" })}
            />
            <p className="text-base ">Female</p>
          </div>

          {/* other */}
          <div className="flex-center gap-[10%]">
            <input
              type="radio"
              name="gender"
              id="gender"
              onClick={(e) => setUser({ ...user, gender: "other" })}
            />
            <p className="text-base ">Other</p>
          </div>
        </div>
      </div>

      <div className="border w-[60%] mb-5">
        <h2 className="text-base font-bold mb-2">Phone Number: </h2>
        <input
          type="text"
          name="phno"
          id="phno"
          className="input"
          placeholder="Enter your Phone number"
          value={user.phno}
          onChange={(e) => setUser({ ...user, phno: e.target.value })}
        />
      </div>

      <div className="w-full flex-center">
        <button className=""></button>
        <button className="button" onClick={onSignup}>
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default RegistrationForm;
