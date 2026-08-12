import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('mongodb connected')
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "mongodb connection error",
        });
    }
};

export default connectDB