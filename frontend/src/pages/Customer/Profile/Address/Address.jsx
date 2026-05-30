import React, { useEffect, useState } from "react";
import MainContainer from "../../../../components/container/MainContainer";
import AddressForm from "./AddressForm";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router";

function Address() {
  const setOption = useOutletContext();
  const [addAddress, setAddAddress] = useState(false);
  const [allAddress, setAllAddress] = useState([]);
  const [editAddress, setEditAddress] = useState("");

  useEffect(() => {
    const getAddresses = async () => {
      try {
        const res = await axios.get("/api/v1/user/address");
        console.log(res.data.data);
        setAllAddress(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAddresses();
  }, []);

  const onAddAddress = async (address) => {
    try {
      const res = await axios.post("/api/v1/user/address/add-address", address);
      console.log(res.data.data);
      const allRes = await axios.get("/api/v1/user/address");
      setAllAddress(allRes.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setAddAddress(false);
    }
  };

  const onEditAddress = async (id, address) => {
    try {
      const res = await axios.put(
        `/api/v1/user/address/edit-address/${id}`,
        address,
      );
      console.log(res.data.data);
      const allRes = await axios.get("/api/v1/user/address");
      setAllAddress(allRes.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setEditAddress("");
    }
  };

  const onRemoveAddress = async (id) => {
    try {
      const res = await axios.delete(
        `/api/v1/user/address/delete-address/${id}`,
      );
      const allRes = await axios.get("/api/v1/user/address");
      setAllAddress(allRes.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setOption("address");
  }, []);

  return (
    <MainContainer>
      <div className=" w-full h-full flex flex-col  gap-5">
        <div className="py-5 px-10 w-full  bg-(--primary) rounded-md flex flex-col gap-4">
          <div className="flex justify-between items-center ">
            <h2 className="text-2xl text-(--accent-second) font-bold">
              Manage Address
            </h2>
            {!addAddress && (
              <button
                className="button text-white bg-(--accent-second) border-2 border-(--accent-second) hover:text-white hover:border-(--accent-second) focus:bg-(--accent-second) focus:border-(--accent-second)"
                onClick={() => setAddAddress(true)}
              >
                Add Address
              </button>
            )}
          </div>
          {addAddress && (
            <div className="border-2 border-(--accent-shade) rounded-md">
              <AddressForm
                header={"Add Address"}
                displayForm={setAddAddress}
                apiCall={onAddAddress}
              />
            </div>
          )}

          <div className="flex flex-col gap-3">
            {allAddress.map((address) =>
              editAddress === address._id ? (
                <div className="border-2 border-(--accent-shade) rounded-md">
                  <AddressForm
                    header={"Edit Address"}
                    item={address}
                    displayForm={setEditAddress}
                    apiCall={onEditAddress}
                  />
                </div>
              ) : (
                <div
                  key={address._id}
                  className="flex justify-between items-end w-full border-2 border-(--accent-shade) rounded-md p-3"
                >
                  <div className="flex flex-col gap-2">
                    <div>
                      <p className="px-2  py-1 bg-(--accent-shade) rounded-sm justify-self-start text-white text-sm font-semibold">
                        {address.addressType}
                      </p>
                    </div>
                    <div>
                      <p className="text-base text-(--text) font-semibold">
                        {address.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-(--text-secondary)">{`${address.building ? address.building + ", " + address.landmark + ", " + address.street : address.landmaek + ", " + address.street}`}</p>
                      <p className="text-sm text-(--text-secondary)">{}</p>
                      <p className="text-sm text-(--text-secondary)">
                        {address.city +
                          ", " +
                          address.state +
                          " - " +
                          address.pin}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-(--text-secondary)">
                        Phone Number:-&nbsp;{address.phno}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      className="button bg-(--accent) border-2 border-(--accent) text-white hover:text-white px-5"
                      onClick={() => setEditAddress(address._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="button text-(--text-secondary) border-2 border-(--accent-shade) hover:text-(--text-secondary) hover:border-(--accent-shade) focus:bg-white"
                      onClick={() => onRemoveAddress(address._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </MainContainer>
  );
}

export default Address;
