import { useEffect, useState } from "react";
import "./App.css";
import { Outlet } from "react-router";
import PageContainer from "./components/container/PageContainer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";

import { login, logout } from "./store/AuthSlice";

function App() {
  const [loading, setloading] = useState(false);
  const dispatcher = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/v1/user");
        if (res) {
          console.log(res.data.data.role);
          dispatcher(login(res.data.data));
        }
      } catch (error) {
        dispatcher(logout());

        console.log(error);
      } finally {
        setloading(true);
      }
    };
    fetchUser();
  }, [loading, setloading]);

  return loading ? (
    <div>
      <Outlet />
    </div>
  ) : (
    <></>
  );
}

export default App;
