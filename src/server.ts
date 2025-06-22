import mongoose from "mongoose";
import app from "./app";

let server;

const port = 4000;

const main = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://mongodb:mongodb@cluster0.uqid44n.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0"
    );
    server = app.listen(port, () => {
      console.log(`server is running on : ${port}`);
    });
  } catch (error) {
    console.log("Error during main:", error);
  }
};
main();
