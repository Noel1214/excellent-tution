import mongoose from "mongoose";

let isConnected = false;

export async function connect() {

    if(isConnected) {
        console.log("db connection aldready found");
        return;
    };

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        let connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("Database successfully connected");
        });

        connection.on("error", (err) => {
            console.log("Database connection error:", err);
            isConnected = false
        });

        connection.on('disconnected', () => {
            console.log("database disconnected");
            isConnected = false;
        })

        isConnected = true;
    } catch (error) {
        console.log("Error in database connection:", error);
    }
}
