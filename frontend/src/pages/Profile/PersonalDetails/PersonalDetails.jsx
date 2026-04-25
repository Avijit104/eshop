import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router";

function PersonalDetails() {
  const userData = useSelector((state) => state.auth.userData);
  const [username, setUsername] = useState("");
  const [edit, setEdit] = useState(true);

  useEffect(() => {
    setUsername(userData.username);
    console.log(username);
  }, []);

  const editUsername = async () => {
    setEdit(true);
  };

  return (
    <div className="flex-center flex-col ">
      <h2 className="text-2xl font-bold mb-5">Personal Details</h2>
      <div className="w-full flex-center mb-10">
        <div className=" flex-center w-[90%]  gap-10">
          <div className="w-[50%]">
            <h3 className="text-lg font-bold mb-1 ">Username</h3>
            <div className="flex-center gap-5">
              <input
                type="text"
                className="input mb-0"
                value={username}
                name="username"
                id="username"
                readOnly={edit}
                autoComplete="off"
                onChange={(e) => setUsername(e.target.value)}
              />
              <div>
                {!edit ? (
                  <button className="button" onClick={editUsername}>
                    save
                  </button>
                ) : (
                  <button className="button" onClick={() => setEdit(false)}>
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="w-[50%]">
            <h3 className="text-lg font-bold mb-1 ">Email</h3>
            <p className="input mb-0">{userData.email}</p>
          </div>
        </div>
      </div>
      <div className="w-full flex-center">
        <div className="w-[90%] flex-center gap-5">
          <div className="w-[50%]">
            <h3 className="text-lg font-bold mb-1">Verify</h3>
            <div className="w-full flex-center gap-5">
              <p className="input mb-0">{`${userData.isVerified}`}</p>
              <button className="button">Verify</button>
            </div>
          </div>
          <div className="w-[50%] flex-center">
            <button className="button">Change Password</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalDetails;
