import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { login } from "./store/AtuhSlice";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const [loading, setLoading] = useState(false);
  console.log("this is outer ");
  const dispatcher = useDispatch();
  useEffect(() => {
    console.log("this is inner");
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/v1/user");
        if (res) {
          console.log("this is fetch user");
          dispatcher(login(res.data.data));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(true);
      }
    };
    fetchUser();
  }, [setLoading, loading]);
  return loading ? (
    <>
      <Outlet />
    </>
  ) : (
    <></>
  );
}

export default App;
