import { User } from "../../models/userModel.js";
import bcrypt from "bcrypt";
const addUser = async (req, res) => {
    try {
        console.log('req received in adduser')
        const {email,username,role,password}=req.body
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
        email,
        username,
        role,
        password:hashedPassword,
    })
    const allUser=await User.find()
  return res.status(201).json(allUser)
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

export default addUser