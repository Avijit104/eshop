import dotEnv from "dotenv";
import app from "./app.js";
import connect from "./dbConfig/Connect.js";

dotEnv.config({
  path: "./.env",
});

const port = process.env.PORT || 8020;

connect()
  .then(() => {
    app.listen(port, () => {
      console.log("server is running in port no ", port);
    });
  })
  .catch(() => {
    console.log("server error");
  });
