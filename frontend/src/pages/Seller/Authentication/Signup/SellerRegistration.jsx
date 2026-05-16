import React, { useRef, useState } from "react";
import MainContainer from "../../../../components/Container/MainContainer";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router";
import axios from "axios";
import { login } from "../../../../store/AtuhSlice";
import PageContainer from "../../../../components/Container/PageContainer";

function SellerRegistration() {
  // hooks
  const dispathcer = useDispatch();
  const navigate = useNavigate();
  const refGender = useRef(null);

  // states
  const [user, setUser] = useState({
    email: "",
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

  //seller signup api call
  const onSignup = async () => {
    try {
      const res = await axios.post("/api/v1/seller/auth/signup", user);
      if (res.data.data.role === "seller") {
        dispathcer(login(res.data.data));
        navigate("/seller/business-signup");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PageContainer>
      <div className="w-full h-full flex-center">
        <div className="flex-center flex-col w-[60%] text-2xl gap-7  bg-black rounded-2xl p-10">
          <div className="pb-4  w-[90%] border-b-2 border-gray-700">
            <h1 className="font-bold text-center">Seller Signup</h1>
          </div>
          {/* registration form input */}
          <div className="w-[75%]  ">
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
                  onChange={(e) =>
                    setUser({ ...user, firstName: e.target.value })
                  }
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
                  onChange={(e) =>
                    setUser({ ...user, lastName: e.target.value })
                  }
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
                  value={user.email}
                  className="input mb-0"
                  placeholder="Enter your Email Id"
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
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
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
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
                    <p
                      className="text-base gender text-(--code-bg) "
                      id="female"
                    >
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
                    <p
                      className="text-base gender text-(--code-bg) "
                      id="other"
                    >
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
          <div>
            <p className="text-sm text-gray-600">
              Already registerd &nbsp;
              <Link className="text-blue-500" to="/seller/login">
                Click here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default SellerRegistration;
