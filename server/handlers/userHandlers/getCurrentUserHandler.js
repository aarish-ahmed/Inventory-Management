import { User } from "../../models/userModel.js";

const getCurrentUserHandler = async (req, res) => {
    try {
     
        const userId=req.user.id
       
       
    const user= await User.findById(userId)
  
   

    return res.status(201).json(user)
    } catch (error) {
        console.error(error);
        return res.status(401).json({
            message: "Internal Server Error",
        });
    }
};

export default getCurrentUserHandler