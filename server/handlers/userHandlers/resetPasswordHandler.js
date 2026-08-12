import {User} from '../../models/userModel.js'
import bcrypt from 'bcrypt'
const resetPasswordHandler = async (req, res) => {
    try {
        const {email,password}=req.body
        console.log(password,email)
    const user=await User.findOne({email:email})
    console.log(user)
    const hashedPassword=await bcrypt.hash(password,10)
    user.password=hashedPassword
    await user.save()
    return res.status(201).json({
        message:'password reset successful'
    });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "resetPasswordHandler Error",
        });
    }
}
export default resetPasswordHandler