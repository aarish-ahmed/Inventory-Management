import { User } from "../../models/userModel.js"
import sendEmail from "../../utils/sendEmail.js";
const sendOtpHandler = async (req, res) => {
 try {
     const { email } = req.body;
     console.log(email)
  const user = await User.findOne({ email: email });
  if(!user){
    return res.status(400).json({
        message:'no user found '
    })
  }
  console.log(user)
  const verificationCode = Math.floor(
    100000 + Math.random() * 900000,
  ).toString();
  console.log(verificationCode)
  const verificationExpires = new Date(Date.now() + 2 * 60 * 1000);
  user.verificationCode=verificationCode
  user.verificationExpires=verificationExpires
  await user.save()
  console.log(user)
  await sendEmail(email,verificationCode)
  return res.status(200).json({
    email:email,
    message:'otp sent to your gmail'
  })
 } catch (error) {
    console.error(error);
    return res.status(500).json({
        message: "sendOtpHandler Error",
    });
 }
};
export default sendOtpHandler;
