import { User } from "../../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const loginHandler = async (req, res) => {
    try {
     const {email,password}=req.body
    const existingUser= await User.findOne({
        email:email
    })
    
    if(existingUser){
        const isMatch=await bcrypt.compare(password,existingUser.password)
        
        console.log(isMatch)
        if(isMatch){
            if (!existingUser.isVerified) {
  return res.status(401).json({
    message: "Please verify your email first",
  });
}

            const jwtToken=jwt.sign({
                id:existingUser._id,
                username:existingUser.username,
                role:existingUser.role,
            },
            process.env.JWT_SECRET
        )
            console.log(jwtToken)
            res.cookie('Token',jwtToken,{
                maxAge:7*24*60*60*1000,
            })
            return res.status(200).json({
                user:existingUser,
                message:'login successful'
            })
            
        }
        return res.status(401).json({
            message:'wrong password'
        })
    }
    res.status(404).json({
        message:'No User found,Please signup'
    })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "loginHandler error",
        });
    }
};
export default loginHandler