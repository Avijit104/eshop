import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Navbar from "../../../components/Navbar";

function Profile() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/v1/user");
        console.log(res, res.data);
        setUser(res.data.data);
        console.log("user", user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);
  return (
    <div className="main ">
      <Navbar />
      {user && (
        <div className="text-white  ">
          <p>this is profile pages</p>
          <p> Username: {user.username} </p>
          <p>Email: {user.email} </p>
          <p> Verified: {user.isVerified.toString()} </p>
        </div>
      )}
    </div>
  );
}

export default Profile;
