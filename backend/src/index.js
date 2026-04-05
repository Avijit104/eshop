import dotEnv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";

dotEnv.config({
  path: "./.env",
});

const port = process.env.PORT || 8020;

app.listen(port, () => {
  console.log("server is running in port no ", port);
});
