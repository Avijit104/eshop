import React from "react";
import { useNavigate } from "react-router";

function NavbarSeller() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full box-border flex justify-between items-center px-15 bg-black ">
      <div>
        <h1 className="text-blue-500 font-bold text-3xl">Ethenicity</h1>
      </div>
      <div className="flex gap-10 items-center">
        <button
          className="button rounded-3xl"
          onClick={() => {
            navigate("/seller/dashboard");
          }}
        >
          Dashboard
        </button>
        <button
          className="button rounded-3xl"
          onClick={() => navigate("/seller/inventory")}
        >
          Inventory
        </button>
        <button
          className="button rounded-3xl text-nowrap"
          onClick={() => navigate("/seller/add-product")}
        >
          Add Product
        </button>
        <button
          className="button rounded-3xl"
          onClick={() => navigate("/seller/orders")}
        >
          Orders
        </button>
      </div>
    </div>
  );
}

export default NavbarSeller;
