
import mongoose from "mongoose";
const db_url = process.env.MONGODB_URL;


const connectDB = async() => {
    try {
        const connectionInstance = await mongoose.connect(`${db_url}`)
        console.log(`\n MongoDB connected successfully ! ! DB HOST : ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("Database connection error", error);
        process.exit(1);
    }
}

export default connectDB