import React from "react";
import SideContainer from "../../../components/Container/SideContainer";
import { useNavigate } from "react-router";

function SideNav() {
  // hooks
  const navigate = useNavigate();

  // dom
  return (
    <SideContainer>
      <div className="w-full h-full flex justify-center items-start py-10 px-5">
        <div className="flex-center flex-col items-center gap-5 w-full">
          {/* add product button */}
          <div className="w-full p-4 bg-black rounded-2xl flex-center">
            <button
              className="button"
              onClick={() => navigate("/seller/inventory/add-product")}
            >
              Add&nbsp;Product
            </button>
          </div>
        </div>
      </div>
    </SideContainer>
  );
}

export default SideNav;
