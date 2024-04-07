import { Mongoose } from "mongoose";

export async function connect() {
    try {
        Mongoose.connect(process.env.MONGO_DB_URI);
        let connection = Mongoose.connection;

        connection.on("connected", () => {
            console.log("DataBase successfully connected");
        })

        connection.on("error", (err) => {
            console.log("DataBase connection error ", err);
            process.exit();
        })
        
    } catch (error) {
        console.log("error in database connection");
        console.log(error);
    }
}