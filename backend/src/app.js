import express from "express";
import cookieParser from "cookie-parser";

const app = express();

//basic configuration----------------------------------------------------------------------------------------
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// cookie configuration --------------------------------------------------------------------------------------
app.use(cookieParser());

//routes-----------------------------------------------------------------------------------------------------
app.get("/", (req, res) => {
  res.send({ message: "wellcome to my new eshop" });
});

// app export ---------------------------------------------------------------------------------------------------
export default app;
