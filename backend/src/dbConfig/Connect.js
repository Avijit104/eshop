import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("mongodb connection successful");
  } catch (error) {
    console.log("mongodb connection error", error);
  }
};

export default connect;
