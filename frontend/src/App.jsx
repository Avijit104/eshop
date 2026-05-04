import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { login, logout } from "./store/AtuhSlice";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const [loading, setLoading] = useState(false);
  const dispatcher = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/v1/user");
        if (res) {
          dispatcher(login(res.data.data));
        }
      } catch (error) {
        console.log("this is app jsx");
        dispatcher(logout());
        console.log(error);
      } finally {
        setLoading(true);
      }
    };
    fetchUser();
  }, [setLoading, loading]);
  return loading ? (
    <div className="">
      <Outlet />
    </div>
  ) : (
    <></>
  );
}

export default App;
