import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router";
import MainContainer from "../../../../components/Container/MainContainer";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setBusiness } from "../../../../store/seller/BusinessSlice";

function Business() {
  // hooks
  const navigate = useNavigate();
  const dispatcher = useDispatch();
  const { businessId } = useParams();
  const { setOption } = useOutletContext();

  // states
  const [businessDetails, setBusinessDetails] = useState({
    businessName: "",
    gst: "",
  });
  const [addressDetails, setAddressDetails] = useState({
    building: "",
    street: "",
    landmark: "",
    city: "",
    pin: "",
    state: "",
  });
  const [editBusinessName, setEditBusinessName] = useState(true);
  const [editGst, setEditGst] = useState(true);
  const [editAddress, setEditAddress] = useState(false);

  // business updation api call
  const onBusinessUpdate = async () => {
    try {
      const res = await axios.put(
        `/api/v1/seller/${businessId}`,
        businessDetails,
      );
    } catch (error) {
      console.log(error);
    } finally {
      setEditBusinessName(true);
      setEditGst(true);
    }
  };

  // business remove api call
  const onBusinessDelete = async () => {
    try {
      const res = await axios.delete(`/api/v1/seller/${businessId}`);
      dispatcher(setBusiness(res.data.data));
      const navBusiness = res.data.data[0];
      navigate(`/seller/dashboard/business/${navBusiness._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  // business address api call
  const onAddressUpdate = async () => {
    try {
      const res = await axios.put(
        "/api/v1/seller/edit/address",
        addressDetails,
      );
      setAddressDetails(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setEditAddress(false);
    }
  };

  // use effect for fetching single business
  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const res = await axios.get(`/api/v1/seller/${businessId}`);
        console.log(res.data.data);
        setBusinessDetails({
          businessName: res.data.data.businessName,
          gst: res.data.data.gst,
        });
        setAddressDetails(res.data.data.address);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBusiness();
    console.log(businessId);
  }, [businessId, editBusinessName, editGst, editAddress]);

  // use effect for state updation
  useEffect(() => {
    setEditBusinessName(true);
    setEditGst(true);
    setEditAddress(false);
    setOption(businessId);
  }, [businessId]);

  // dom
  return (
    <MainContainer>
      <div className="flex-center flex-col">
        {/* header */}
        <div className="flex border-b-2 border-gray-700 w-[90%] items-center p-2 mb-5 justify-between">
          <h2 className="text-2xl font-bold ">Business Details</h2>
          <button className="button" onClick={onBusinessDelete}>
            Delete Business
          </button>
        </div>

        {/* business details box and edit */}
        <div className="w-full flex-center px-5 ">
          <div className="w-[90%] flex flex-col gap-5 ">
            {/* business name box */}
            <div>
              <h2 className="mb-1 text-lg font-bold">Business Name:</h2>
              <div className="flex justify-start items-center gap-5">
                <div className="w-[50%]">
                  <input
                    type="text"
                    id="businessname"
                    name="businessname"
                    readOnly={editBusinessName}
                    className="input"
                    value={businessDetails?.businessName}
                    onChange={(e) =>
                      setBusinessDetails({
                        ...businessDetails,
                        businessName: e.target.value,
                      })
                    }
                  />
                </div>
                {editBusinessName ? (
                  // edit button
                  <button
                    className="button"
                    onClick={() => {
                      setEditBusinessName(false);
                    }}
                  >
                    Edit
                  </button>
                ) : (
                  // save button
                  <button className="button" onClick={onBusinessUpdate}>
                    Save
                  </button>
                )}
              </div>
            </div>

            {/* gstin box */}
            <div>
              <h2 className="mb-1 text-lg font-bold">GSTIN :</h2>
              <div className="flex justify-start items-center gap-5">
                <div className="w-[50%]">
                  <input
                    type="text"
                    id="gst"
                    name="gst"
                    readOnly={editGst}
                    className="input"
                    value={businessDetails?.gst}
                    onChange={(e) =>
                      setBusinessDetails({
                        ...businessDetails,
                        gst: e.target.value,
                      })
                    }
                  />
                </div>
                {editGst ? (
                  // edit button
                  <button
                    className="button"
                    onClick={() => {
                      setEditGst(false);
                    }}
                  >
                    Edit
                  </button>
                ) : (
                  // save button
                  <button className="button" onClick={onBusinessUpdate}>
                    Save
                  </button>
                )}
              </div>
            </div>

            {/* address box */}
            <div>
              {editAddress ? (
                // edit address box
                <div className=" flex flex-col  gap-5">
                  {/* edit address header */}
                  <div className="flex justify-between items-center w-[90%] border-b-2 border-gray-700 p-2 ">
                    <h2 className="text-lg font-bold ">Edit Address</h2>
                  </div>

                  {/* edit address form */}
                  <div className="w-[90%] px-5">
                    {/* street, buiding and landmark input box */}
                    <div className=" grid grid-cols-2 gap-5 mb-5 ">
                      {/* building and landmark input box */}
                      <div className="w-full flex flex-col gap-5">
                        {/* building input */}
                        <div className="w-full">
                          <input
                            type="text"
                            name="building"
                            id="building"
                            placeholder="Enter your Building name/no. (Optional)"
                            className="input"
                            value={addressDetails?.building}
                            onChange={(e) =>
                              setAddressDetails({
                                ...addressDetails,
                                building: e.target.value,
                              })
                            }
                          />
                        </div>

                        {/* landmark input */}
                        <div className="w-full">
                          <input
                            type="text"
                            name="landmark"
                            id="landmark"
                            placeholder="Enter your landmark"
                            className="input"
                            value={addressDetails?.landmark}
                            onChange={(e) =>
                              setAddressDetails({
                                ...addressDetails,
                                landmark: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      {/* street input box */}
                      <div className="w-full h-full">
                        {/* street input  */}
                        <div className=" flex flex-col h-full">
                          <textarea
                            name="street"
                            id="street"
                            placeholder="Enter your address (street and area)"
                            className="input block resize-none h-full"
                            autoComplete="off"
                            value={addressDetails?.street}
                            onChange={(e) =>
                              setAddressDetails({
                                ...addressDetails,
                                street: e.target.value,
                              })
                            }
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    {/* city and pin input box */}
                    <div className="flex justify-baseline items-center gap-5 mb-5">
                      {/* city input */}
                      <div className="w-[50%]">
                        <input
                          type="text"
                          name="city"
                          id="city"
                          className="input"
                          placeholder="Enter your city/village name"
                          value={addressDetails?.city}
                          onChange={(e) =>
                            setAddressDetails({
                              ...addressDetails,
                              city: e.target.value,
                            })
                          }
                        />
                      </div>

                      {/* pin input */}
                      <div className="w-[50%]">
                        <input
                          type="text"
                          name="pin"
                          id="pin"
                          inputMode="numeric"
                          className="input"
                          placeholder="Enter your pin code"
                          value={addressDetails?.pin}
                          onChange={(e) => {
                            const pinValue = e.target.value.replace(/\D/g, "");
                            setAddressDetails({
                              ...addressDetails,
                              pin: pinValue,
                            });
                          }}
                        />
                      </div>
                    </div>
                    {/* state and address type input box */}
                    <div className="flex justify-baseline items-center gap-5 mb-5">
                      {/* state input */}
                      <div className="w-[50%]">
                        <input
                          type="text"
                          name="state"
                          id="state"
                          className="input"
                          placeholder="Enter your state"
                          value={addressDetails?.state}
                          onChange={(e) =>
                            setAddressDetails({
                              ...addressDetails,
                              state: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="w-[50%] flex gap-5">
                        <button className="button" onClick={onAddressUpdate}>
                          Save&nbsp;Address
                        </button>
                        <button
                          className="button"
                          onClick={() => {
                            setEditAddress(false);
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Business address display box
                <div>
                  <h2 className="mb-1 text-lg font-bold">Aaddress :</h2>
                  <div className="flex justify-start items-baseline-last gap-5">
                    <div className="input w-[50%]">
                      {/* address */}
                      <p>
                        {`${addressDetails?.building ? addressDetails.building + " ," + addressDetails?.street : addressDetails?.street}`}
                      </p>
                      <p>{addressDetails?.landmark}</p>
                      <p>
                        {addressDetails?.city}, {addressDetails?.pin}
                      </p>
                      {addressDetails?.state}
                    </div>
                    {/* edit address button */}
                    <button
                      className="button"
                      onClick={() => {
                        setEditAddress(true);
                      }}
                    >
                      Edit&nbsp;Address
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainContainer>
  );
}

export default Business;
