import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.get("/", (req, res) => {
  res.send({ message: "wellcome to my new eshop" });
});

export default app;
