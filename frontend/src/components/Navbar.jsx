import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { login } from "../store/AtuhSlice";

function Navbar() {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const dispatcher = useDispatch();

  const navigate = useNavigate();
  return (
    <div className="w-full h-full box-border flex justify-between items-center px-15 bg-black  ">
      <div>
        <h1 className="text-2xl font-bold text-blue-600">Ethenicity</h1>
      </div>
      {isLogin ? (
        <div className="flex gap-10">
          <button
            className="button font-bold rounded-3xl  "
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </button>
          <button
            className="button font-bold rounded-3xl "
            onClick={() => {
              navigate("/");
            }}
          >
            Cart
          </button>
          <button
            className="button font-bold rounded-3xl "
            onClick={() => {
              navigate("/user");
            }}
          >
            Profile
          </button>
        </div>
      ) : (
        <div className="flex gap-10">
          <button
            className="button font-bold rounded-3xl  "
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </button>
          <button
            className="button font-bold rounded-3xl "
            onClick={() => {
              navigate("/signup");
            }}
          >
            Signup
          </button>
          <button
            className="button font-bold rounded-3xl "
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
