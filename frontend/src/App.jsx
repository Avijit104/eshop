import { useEffect, useState } from "react";
import "./App.css";
import { Outlet } from "react-router";
import PageContainer from "./components/container/PageContainer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";

import { login, logout } from "./store/AuthSlice";

function App() {
  const [count, setCount] = useState(0);
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
        dispatcher(logout());
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  return (
    <div>
      <Outlet />
    </div>
  );
}

export default App;
