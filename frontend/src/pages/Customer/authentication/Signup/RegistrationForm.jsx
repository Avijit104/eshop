import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router";
import { login } from "../../../../store/AtuhSlice";

function RegistrationForm(email) {
  // hooks
  const dispatcher = useDispatch();
  const navigate = useNavigate();
  const refGender = useRef(null);

  // states
  const [user, setUser] = useState({
    email: email.email,
    username: "",
    gender: "",
    phno: "",
    password: "",
  });

  // seting gender and dom manupulation function
  const setGender = async (value) => {
    await setUser({ ...user, gender: `${value}` });
    document.getElementById("male").style.color = "#8c8c8c";
    document.getElementById("female").style.color = "#8c8c8c";
    document.getElementById("other").style.color = "#8c8c8c";
    document.getElementById("male").style.fontWeight = "normal";
    document.getElementById("female").style.fontWeight = "normal";
    document.getElementById("other").style.fontWeight = "normal";
    document.getElementById(`${value}`).style.color = "blue";
    document.getElementById(`${value}`).style.fontWeight = "bold";
  };

  // api call for registering user/signup
  const onSignup = async () => {
    try {
      const res = await axios.post("/api/v1/user/auth/signup", user);
      if (res.data.data.role === "user") {
        dispathcer(login(res.data.data));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // dom return
  return (
    <div className="w-full">
      {/* name */}
      <div className="flex justify-baseline gap-5  mb-5">
        {/* first name */}
        <div className="w-[49%] ">
          <input
            type="text"
            name="username"
            id="username"
            className="input"
            placeholder="Enter your first name"
            autoComplete="off"
            value={user.firstName}
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          />
        </div>

        {/* last name */}
        <div className="w-[49%]">
          <input
            type="text"
            name="username"
            id="username"
            className="input"
            placeholder="Enter your last name"
            value={user.lastName}
            autoComplete="off"
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          />
        </div>
      </div>

      {/* email */}
      <div className="flex justify-baseline items-baseline-last gap-5  mb-5">
        <div className="w-[49%] ">
          <input
            type="email"
            name="email"
            id="email"
            value={email.email}
            readOnly
            className="input mb-0"
            placeholder="Enter your Email Id"
          />
        </div>

        {/* password */}
        <div className="w-[49%]">
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
      </div>

      <div className="flex justify-baseline items-baseline gap-5  mb-5">
        {/* gender */}
        <div className=" mb-5 w-[49%] input">
          <h2 className="text-base font-bold text-(--code-bg) mb-2">
            Gender :
          </h2>
          <div className=" flex-center justify-around" ref={refGender}>
            {/* male */}
            <div className="flex-center gap-[10%]">
              <input
                type="radio"
                name="gender"
                id="gender"
                onClick={() => setGender("male")}
              />
              <p className="text-base gender text-(--code-bg)" id="male">
                Male
              </p>
            </div>

            {/* female */}
            <div className="flex-center gap-[10%]">
              <input
                type="radio"
                name="gender"
                id="gender"
                onClick={() => setGender("female")}
              />
              <p className="text-base gender text-(--code-bg) " id="female">
                Female
              </p>
            </div>

            {/* other */}
            <div className="flex-center gap-[10%]">
              <input
                type="radio"
                name="gender"
                id="gender"
                onClick={() => setGender("other")}
              />
              <p className="text-base gender text-(--code-bg) " id="other">
                Other
              </p>
            </div>
          </div>
        </div>

        {/*  phone number */}
        <div className=" w-[49%] mb-5">
          <input
            type="text"
            name="phno"
            id="phno"
            className="input"
            placeholder="Enter your Phone number"
            inputMode="numeric"
            value={user.phno}
            onChange={(e) => {
              const phoneValue = e.target.value.replace(/\D/g, "");
              setUser({ ...user, phno: phoneValue });
            }}
          />
        </div>
      </div>

      <div className="w-full flex-center gap-10">
        {/* sign up button */}
        <button className="button" onClick={onSignup}>
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default RegistrationForm;
