import { User } from "../../models/userModel.js";
import bcrypt from "bcrypt";
import { signupSchema } from "../../validation/userValidation.js";
import sendEmail from "../../utils/sendEmail.js";
const signupHandler = async (req, res) => {
  try {
    const result = signupSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: result.error.issues[0].message,
      });
    }
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();
     const verificationExpires = new Date(Date.now() + 2 * 60 * 1000);
    const { email, username, password } = result.data;
    console.log(result.data);
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      if (!existingUser.isVerified) {
        console.log('its an existing user')
        existingUser.verificationCode = verificationCode;
        existingUser.verificationExpires = verificationExpires;
        await sendEmail(email, verificationCode);
        await existingUser.save()
        console.log(existingUser)
        return res.status(200).json({
          message: "please verify your email",
          email: email,
        });
      }
      return res.status(400).json({
        message: "Already registered,Please login",
        
      });
    }

    console.log('not an existing user')
    await User.create({
      email,
      username,
      password: hashedPassword,
      verificationCode,
      isVerified: false,
      verificationExpires,
    });
    await sendEmail(email, verificationCode);
    res.status(201).json({
      message: "otp sent",
      email: email,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "signupHandler error",
    });
  }
};

export default signupHandler;
