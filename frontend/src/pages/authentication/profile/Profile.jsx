import axios from "axios";
import { use, useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../store/AtuhSlice";
import { useNavigate } from "react-router";

function Profile() {
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [mail, setMail] = useState(false);
  const dispatcher = useDispatch();
  const userDetails = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const editUsername = async () => {
    try {
      if (!user.username) {
        console.log("enter a user name");
      } else {
        // console.log(user);
        setEdit(false);
        const res = await axios.put("/api/v1/user", user);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const sendVerifyEmail = async () => {
    try {
      const res = await axios.get("/api/v1/user/verification-mail");
      if (res) {
        console.log(res.data);
        setMail(true);
        setTimeout(() => {
          setMail(false);
        }, 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/v1/user");
        dispatcher(login(res.data.data._id));
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
      <div className="w-full  mx-auto py-20">
        {user && (
          <div className="w-full flex-center flex-col">
            {mail && (
              <div className="flex items-center gap-20 w-[25%] rounded-2xl p-3 px-5 absolute right-20 top-20 notification-bg">
                <p className="text-blue-600">
                  Email verifiacation mail sent to your email id successfully
                </p>
                <button className="button p-1 flex">
                  <span
                    class="material-symbols-outlined"
                    onClick={() => setMail(false)}
                  >
                    close
                  </span>
                </button>
              </div>
            )}
            <section className="w-[90%] mb-10 bg-black p-10 rounded-xl">
              <h1 className="text-xl font-bold px-2">Personal Details</h1>

              <div className="w-full py-10  ">
                <div className="flex-center justify-around mb-10">
                  <div className="w-[40%] ">
                    <h2 className="text-lg mb-2">Username</h2>
                    <div className="flex gap-10 items-center justify-between">
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={user.username}
                        className="input p-3 text-center mb-0"
                        readOnly={edit}
                        onChange={(e) =>
                          setUser({ ...user, username: e.target.value })
                        }
                      />
                      {edit ? (
                        <button className="button" onClick={editUsername}>
                          Save
                        </button>
                      ) : (
                        <button
                          className="button"
                          onClick={() => setEdit(true)}
                        >
                          Edit
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="w-[40%] ">
                    <h2 className="text-lg mb-2">Email</h2>
                    <p className="input p-3 text-center mb-0 ">{user.email}</p>
                  </div>
                </div>
                <div className="flex-center justify-around">
                  <div className="w-[40%] ">
                    <div className="flex gap-10 items-center justify-between">
                      <p className="input p-3 text-center mb-0  ">
                        {user.isVerified ? "Verified" : "Not verified"}
                      </p>
                      {!user.isVerified && (
                        <button className="button" onClick={sendVerifyEmail}>
                          Verify
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="w-[40%] flex-center gap-20">
                    <button
                      className="button"
                      onClick={() => navigate("/user/changepassword")}
                    >
                      Change Password
                    </button>
                    <button className="button">Logout</button>
                  </div>
                </div>
              </div>
            </section>
            <section className="w-[90%] bg-black p-10 rounded-xl ">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold  px-2">Address</h1>
                <button className="button">Add address</button>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
export default Profile;
