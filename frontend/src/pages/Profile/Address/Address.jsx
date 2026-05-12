import React, { useActionState, useEffect, useState } from "react";
import MainContainer from "../../../components/MainContainer";
import axios from "axios";
import AddAddressForm from "./AddAddressForm";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { setuserAddress } from "../../../store/AddressSlice";

function Address() {
  // hooks
  const dispatcher = useDispatch();

  // states
  const [addAddress, setAddAddress] = useState(false);
  const [editAddressId, setEditAddressId] = useState(null);
  const [allAddress, setAllAddress] = useState([]);

  //setter
  const setDisplayAdd = () => {
    setAddAddress(true);
    setEditAddressId(null);
  };
  const setDisplayEdit = (id) => {
    setAddAddress(false);
    setEditAddressId(id);
  };
  //
  const unsetDisplayAdd = () => {
    setAddAddress(false);
  };
  const unsetDisplayEdit = () => {
    setEditAddressId(null);
  };

  // delete address api call
  const onDeleteAddress = async (id) => {
    try {
      console.log(id);
      const res = await axios.delete(
        `/api/v1/user/address/delete-address/${id}`,
      );
      const allRes = await axios.get("/api/v1/user/address");
      setAllAddress(allRes.data.data);
      dispatcher(setuserAddress(allRes.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  // edit address api call
  const onEditAddress = async (address, id) => {
    try {
      const res = await axios.put(
        `/api/v1/user/address/edit-address/${id}`,
        address,
      );
      const allRes = await axios.get("/api/v1/user/address");
      setAllAddress(allRes.data.data);
      dispatcher(setuserAddress(allRes.data.data));
      unsetDisplayEdit();
    } catch (error) {
      console.log(error);
    }
  };

  // add address api call
  const onAddAddress = async (address, id) => {
    try {
      const res = await axios.post("/api/v1/user/address/add-address", address);
      console.log(res.data.data);
      setAddAddress((prev) => [...prev, res.data.data]);
      dispatcher(setuserAddress(allAddress));
    } catch (error) {
      console.log(error);
    }
  };

  // fetching all addresses of user
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const res = await axios.get("/api/v1/user/address");
        setAllAddress(res.data.data);
        dispatcher(setuserAddress(res.data.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAddress();
    setAddAddress(false);
  }, []);

  return (
    <MainContainer>
      <div className="flex-center flex-col gap-5">
        <div className="w-[90%]">
          <div className="mb-5 border-b-2 border-gray-700 p-2">
            <h1 className="text-lg font-bold">Manage Address</h1>
          </div>
          <div className="input bg-black">
            {addAddress ? (
              <div className=" flex flex-col gap-0 justify-baseline items-center ">
                {/* add address form */}
                <div className="flex-center w-full">
                  <AddAddressForm
                    removeDisplayState={unsetDisplayAdd}
                    apiCall={onAddAddress}
                    header={"Add new address"}
                  />
                </div>
              </div>
            ) : (
              <button
                className="button ml-10"
                onClick={() => {
                  setDisplayAdd();
                }}
              >
                Add Address
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center w-full gap-5">
          {allAddress.map((address) => {
            return (
              <div className="input px-5 w-[90%]" key={address._id}>
                <div>
                  {/* address display/listing */}
                  {editAddressId !== address._id && (
                    <div>
                      <p className="px-4 py-2 rounded-xl text-sm  w-fit mb-3 bg-gray-700">
                        {address.addressType}
                      </p>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-base">
                            {address.name}&nbsp;&nbsp;&nbsp;
                            <span className="font-bold">{address.phno}</span>
                          </p>
                          <p className="text-sm text-gray-400 text-wrap">
                            {`${address.building ? address.building + ", " + address.landmark : address.landmark}, ${address.street}, ${address.city}, ${address.state}`}
                            &nbsp;-&nbsp;
                            <span className="font-bold">{address.pin}</span>
                          </p>
                        </div>

                        <div className="flex gap-5">
                          <button
                            className="button"
                            onClick={() => {
                              setDisplayEdit(address._id);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="button"
                            onClick={() => {
                              onDeleteAddress(address._id);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* edit address form */}
                <div className="w-full ">
                  {editAddressId === address._id && (
                    <AddAddressForm
                      removeDisplayState={unsetDisplayEdit}
                      apiCall={onEditAddress}
                      data={address}
                      header={"Edit address"}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </MainContainer>
  );
}

export default Address;
