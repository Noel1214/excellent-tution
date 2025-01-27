import mongoose from "mongoose";

const connectionStates = {};

export async function connect() {
  if (connectionStates.isConnected) {
    return;
  }
  try {
    let db = await mongoose.connect(process.env.MONGODB_URI);
    connectionStates.isConnected = db.connection.readyState;
  } catch (error) {
    console.log("Error in database connection:", error);
    console.log("exiting process in db");
    process.exit(1);
  }
}
