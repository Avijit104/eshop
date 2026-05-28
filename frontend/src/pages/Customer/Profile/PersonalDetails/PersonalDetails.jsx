import React, { useState } from "react";
import MainContainer from "../../../../components/container/MainContainer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

function PersonalDetails() {
  // hooks
  const dispatcher = useDispatch();
  const navigate = useNavigate();

  // states
  const userData = useSelector((state) => state.auth.userData);
  const [user, setUser] = useState({
    firstName: userData?.firstName || "",
    lastName: userData?.lastName || "",
    email: userData?.email || "",
    phno: userData?.phno || "",
    gender: userData?.gender || "",
  });
  const [name, setName] = useState(true);
  const [email, setEmail] = useState(true);
  const [phno, setPhno] = useState(true);

  // dom
  return (
    <MainContainer>
      <div className="py-5 px-10 flex flex-col items-center ">
        <div className="py-1 px-2 border-b-2 border-(--accent) w-full">
          <h2 className="text-2xl text-(--accent) font-bold">
            Personal Details
          </h2>
        </div>
        <div className="w-[95%] flex flex-col gap-5 items-center  py-5">
          <div className="w-full flex gap-5 items-baseline-last">
            <div className="w-[50%]">
              <h2 className="text-sm text-(--text) font-semibold mb-1">
                First Name
              </h2>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First name"
                className="input"
                value={user.firstName}
                readOnly={name}
                onChange={(e) =>
                  setUser({ ...user, firstName: e.target.value })
                }
              />
            </div>
            <div className="w-[50%]">
              <h2 className="text-sm text-(--text) font-semibold mb-1">
                Last Name
              </h2>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last name"
                className="input"
                value={user.lastName}
                readOnly={name}
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              />
            </div>
            {name ? (
              <button
                className="button text-white bg-(--accent) border-(--accent) hover:text-white"
                onClick={() => setName(false)}
              >
                Edit
              </button>
            ) : (
              <div className="flex gap-5">
                <button
                  className="button text-white bg-(--accent) border-(--accent) hover:text-white"
                  onClick={() => setName(true)}
                >
                  Save
                </button>
                <button
                  className="button text-white bg-(--accent) border-(--accent) hover:text-white"
                  onClick={() => {
                    setUser(userData);
                    setName(true);
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          <div className="w-full flex items-baseline-last gap-5 ">
            <div className="w-full">
              <h2 className="text-sm text-(--text) font-semibold mb-1">
                Email Address
              </h2>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                value={user.email}
                className="input"
                readOnly={email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            {email ? (
              <button
                className="button text-white bg-(--accent) border-(--accent) hover:text-white"
                onClick={() => setEmail(false)}
              >
                Edit
              </button>
            ) : (
              <div className="flex gap-5">
                <button
                  className="button text-white bg-(--accent) border-(--accent) hover:text-white"
                  onClick={() => {
                    setUser(userData);
                    setEmail(true);
                  }}
                >
                  Save
                </button>
                <button
                  className="button text-white bg-(--accent) border-(--accent) hover:text-white"
                  onClick={() => {
                    setUser(userData);
                    setEmail(true);
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          <div className="w-full flex items-baseline-last gap-5">
            <div className="w-full">
              <h2 className="text-sm text-(--text) font-semibold mb-1">
                Phone Number
              </h2>
              <input
                type="text"
                name="phno"
                id="phno"
                placeholder="Enter your email"
                value={user.phno}
                className="input"
                readOnly={phno}
                onChange={(e) => setUser({ ...user, phno: e.target.value })}
              />
            </div>
            {phno ? (
              <button
                className="button text-white bg-(--accent) border-(--accent) hover:text-white"
                onClick={() => setPhno(false)}
              >
                Edit
              </button>
            ) : (
              <div className="flex gap-5">
                <button
                  className="button text-white bg-(--accent) border-(--accent) hover:text-white"
                  onClick={() => setPhno(true)}
                >
                  Save
                </button>
                <button
                  className="button text-white bg-(--accent) border-(--accent) hover:text-white"
                  onClick={() => {
                    setUser(userData);
                    setPhno(true);
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          <div className="w-full flex items-baseline-last gap-5">
            <div className="w-[50%]">
              <h2 className="text-sm text-(--text) font-semibold">Gender</h2>
              <div className="flex input justify-around">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    id="male"
                    checked={user.gender === "male"}
                    readOnly={true}
                    className="appearance-none w-[1.5vh] aspect-square rounded-2xl  scale-125 bg-(--primary)  border-2 checked:bg-(--accent) checked:border"
                  />
                  <p className="text-sm text(--text) font-semibold">Male</p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    id="female"
                    readOnly={true}
                    checked={user.gender === "female"}
                    className="appearance-none w-[1.5vh] aspect-square rounded-2xl  scale-125 bg-(--primary)  border-2 checked:bg-(--accent) checked:border"
                  />
                  <p className="text-sm text(--text) font-semibold">Female</p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    id="other"
                    readOnly={true}
                    checked={user.gender === "other"}
                    className="appearance-none w-[1.5vh] aspect-square rounded-2xl  scale-125 bg-(--primary)  border-2 checked:bg-(--accent) checked:border"
                  />
                  <p className="text-sm text(--text) font-semibold">Other</p>
                </div>
              </div>
            </div>
            <div>
              <button
                className="button text-white bg-(--accent) border-2 border-(--accent) hover:text-white px-10"
                onClick={() => navigate("/user/change-password")}
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainContainer>
  );
}

export default PersonalDetails;
