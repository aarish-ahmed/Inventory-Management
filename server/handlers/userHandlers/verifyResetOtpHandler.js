import { User } from "../../models/userModel.js";

const verfiyResetOtpHandler = async (req, res) => {
    const {email,otp}=req.body
    const user=await User.findOne({email:email})
    if(user.verificationExpires < new Date()){
        return res.status(400).json({
            message:'otp expired'
        })
    }
    if(user.verificationCode === otp){
         return res.status(200).json({
            email:email,
            message:'otp verification successsful'
         })
    }
    return res.status(400).json({
        message:'wrong otp'
    })
};
export default verfiyResetOtpHandler