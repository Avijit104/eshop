// config imports
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// route imports

import healthcheckRouter from "./routes/healthCheck.route.js";

// customer routes
import customerAuthRouter from "./routes/customer/auth.route.js";
import customerUserRouter from "./routes/customer/user.route.js";
import customerAddressRouter from "./routes/customer/address.route.js";

// seller routes
import sellerAuthRouter from "./routes/seller/auth.route.js";

// app
const app = express();

//basic configuration----------------------------------------------------------------------------------------
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// cookie configuration --------------------------------------------------------------------------------------
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

//routes-----------------------------------------------------------------------------------------------------

// server health check routes
app.use("/api/v1/health-check", healthcheckRouter);

// user authenticaton routes
app.use("/api/v1/auth", customerAuthRouter);

// user profile routes
app.use("/api/v1/user", customerUserRouter);
app.use("/api/v1/user/address", customerAddressRouter);

// seller authentication routes
app.use("/api/v1/seller", sellerAuthRouter);

// database check request
app.get("/api", (req, res) => {
  console.log("this is backend");
  res.status(200).json({ message: "wellcome to my new eshop" });
});

// app export ---------------------------------------------------------------------------------------------------
export default app;
