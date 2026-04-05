import { useEffect, useState } from "react";
import axios from "axios";

function Healthcheck() {
  const [healthcheck, setHealthcheck] = useState("");
  const getHealthCehck = async () => {
    try {
      const res = await axios.get("/api/v1/health-check");
      setHealthcheck(res.data.message);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getHealthCehck();
  }, [healthcheck]);
  return (
    <div className="min-w-screen min-h-screen flex justify-center items-center">
      <div className="w-[50%] h-[50%] py-20 rounded-2xl border border-white flex justify-center items-center">
        <p>{healthcheck}</p>
      </div>
    </div>
  );
}

export default Healthcheck;
