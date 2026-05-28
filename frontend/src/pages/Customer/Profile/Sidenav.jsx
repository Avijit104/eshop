import React from "react";
import SideContainer from "../../../components/container/SideContainer";
import { useSelector } from "react-redux";

function Sidenav() {
  const userData = useSelector((state) => state.auth.userData);
  return (
    <SideContainer>
      <div className="flex flex-col items-center gap-5 py-10 px-5 ">
        {/* side nav heading */}
        <div className="flex flex-col gap-1 w-[90%] p-2 items-center justify-center border-b-2 border-(--text-secondary)">
          <div className="flex justify-center p-1 bg-(--accent-second)  items-center text-white  border-3 border-(--accent-second) rounded-full  ">
            {/* logo */}
            <span
              style={{ "font-size": "50px" }}
              class="material-symbols-outlined font-bold"
            >
              person
            </span>
          </div>

          {/* name and email box */}
          <div className="text-center ">
            {/* name */}
            <p className="text-lg font-semibold text-(--text) ">
              Hello,&nbsp;
              <span className="text-(--accent-second)">
                {userData?.firstName}
              </span>
            </p>

            {/* email */}
            <p className="text-sm font-semibold text-(--text-secondary) ">
              {userData?.email}
            </p>
          </div>
        </div>

        {/* side nav buttons */}
        <div className="w-[90%]">
          <button className="button w-full text-start px-2 py-2  hover:text-(--text) hover:border-white   border-2 border-(--primary) focus:text-white  focus:border-(--accent) ">
            Personal Details
          </button>
          <button className="button w-full text-start px-2 py-2  hover:text-(--text) hover:border-white  border-2 border-(--primary) focus:text-white  focus:border-(--accent)">
            Address
          </button>
          <button className="button w-full text-start px-2 py-2   hover:text-(--text) hover:border-white border-2 border-(--primary) focus:text-white  focus:border-(--accent)">
            Gift Card
          </button>
          <button className="button w-full text-start px-2 py-2  hover:text-(--text) hover:border-white  border-2 border-(--primary) focus:text-white  focus:border-(--accent) ">
            Payment
          </button>
          <button className="button w-full text-start px-2 py-2  hover:text-(--text) hover:border-white  border-2 border-(--primary) focus:text-white  focus:border-(--accent) ">
            My Orders
          </button>
          <button className="button w-full text-start px-2 py-2  hover:text-(--text) hover:border-white  border-2 border-(--primary) focus:text-white  focus:border-(--accent) ">
            Wishlist
          </button>
        </div>
      </div>
    </SideContainer>
  );
}

export default Sidenav;
