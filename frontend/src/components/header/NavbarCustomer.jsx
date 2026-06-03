import React from "react";
import Logo from "../Logo";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";
import { logout } from "../../store/AuthSlice";

function NavbarCustomer() {
  // hooks
  const navigate = useNavigate();
  const dispatcher = useDispatch();

  // state
  const isLogin = useSelector((state) => state.auth.isLogin);
  const role = useSelector((state) => state.auth.role);

  const onLogout = async () => {
    try {
      const res = await axios.get("/api/v1/user/logout");
      console.log(res.data.data);
      dispatcher(logout());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  // dom
  return (
    <div className="w-full h-full flex items-center justify-between px-10 gap-3">
      {/* logo */}
      <Logo css={"gap-2"} />

      {/* primary options not viewed for seller */}

      <div className="flex gap-2">
        <button className="button">Categories</button>
        <button className="button">New&nbsp;arraivals</button>
        <button
          className="button"
          onClick={() => {
            navigate("/seller");
          }}
        >
          Become&nbsp;seller
        </button>
        <button className="button">about</button>
      </div>

      {/* search box  not viewed for seller*/}

      <div className="w-[25%]">
        <div className="input flex items-center border-black">
          {/* search input */}
          <input
            type="text"
            className="w-full focus:outline-0 "
            id="search"
            name="search"
            placeholder="search"
            autoComplete="off"
          />

          {/* search button */}
          <button className=" flex justify-center items-center text-(--accent-secondary) hover:text-(--text)">
            <span class="material-symbols-outlined ">search</span>
          </button>
        </div>
      </div>

      {/* cart and profile box */}
      <div>
        {isLogin && (
          <div className="flex gap-1 items-center">
            {/* cart button  */}
            <button className="flex justify-center px-1 py-1  items-center text-(--text) button rounded-sm  focus:bg-(--primary) focus:text-(--accent) ">
              <span
                class="material-symbols-outlined  "
                style={{ "font-size": "30px" }}
              >
                shopping_cart
              </span>
            </button>
            {/* porfile button  */}
            <button
              className="flex justify-center px-1 py-1  items-center text-(--text) button rounded-sm focus:bg-(--primary) focus:text-(--accent) "
              onClick={() => navigate(`/${role}/profile`)}
            >
              <span
                style={{ "font-size": "30px" }}
                class="material-symbols-outlined "
              >
                person
              </span>
            </button>
          </div>
        )}
      </div>

      {/* auth buttons */}
      <div className="">
        {isLogin ? (
          <div>
            <button className="button border-2 border-black" onClick={onLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            <button
              className="button border-2 border-black"
              onClick={() => navigate("/user")}
            >
              Login
            </button>
            <button
              className="button border-2 border-black"
              onClick={() => navigate("/user/signup")}
            >
              Signup
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

{
  /* logout button */
}
<button className="button border-2 border-black">Logout</button>;
export default NavbarCustomer;
