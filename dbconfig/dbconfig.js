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
            process.exit(1); // Exiting the process if there's a connection error
        });
        
    } catch (error) {
        console.log("Error in database connection:", error);
        process.exit(1); // Exiting the process if there's an error during connection
    }
}
