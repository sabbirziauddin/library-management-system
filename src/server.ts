import mongoose from "mongoose";
import app from "./app";
import dotenv from "dotenv";

let server;
dotenv.config();
const port = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI || "";

const main = async () => {
  try {
    await mongoose.connect(uri);
    console.log("mongoose are connected");
    server = app.listen(port, () => {
      console.log(`server is running on : ${port}`);
    });
  } catch (error) {
    console.log("Error during main:", error);
  }
};
main();
