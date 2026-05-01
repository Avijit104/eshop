import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { login } from "./store/AtuhSlice";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const [loading, setLoading] = useState(false);
  const dispatcher = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/v1/user");
        if (res) {
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
