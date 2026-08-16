import { User } from "../../models/userModel.js";

const getAllUser = async (req, res) => {
    try {
       
        const allUser=await User.find()
    return res.status(201).json(allUser)
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

export default getAllUser