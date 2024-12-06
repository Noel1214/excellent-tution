import mongoose from "mongoose";

export async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        let connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("Database successfully connected");
        });

        connection.on("error", (err) => {
            console.log("Database connection error:", err);
        });
        
    } catch (error) {
        console.log("Error in database connection:", error);
    }
}
