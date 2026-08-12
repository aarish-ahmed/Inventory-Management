
import { User } from "../../models/userModel.js";
const verifyEmailHandler = async (req, res) => {
  try {
    const { email, otp } = req.body;
    console.log(email,otp)

    // 1. Find the user by email
    const user = await User.findOne({ email });

    // 2. If user doesn't exist
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // 3. If already verified
    if (user.isVerified) {
      return res.status(400).json({
        message: "Email already verified",
      });
    }

    // 4. Check if OTP matches
    if (user.verificationCode !== otp) {
      return res.status(400).json({
        message: "Invalid verification otp",
      });
    }

    // 5. Check if OTP expired
    if (user.verificationExpires < new Date()) {
      return res.status(400).json({
        message: "Verification otp has expired",
      });
    }

    // 6. Mark as verified
    user.isVerified = true;

    // 7. Clear OTP fields
    user.verificationCode = null;
    user.verificationExpires = null;

    // 8. Save changes
    await user.save();

    // 9. Respond
    return res.status(200).json({
      message: "Email verified successfully",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export default verifyEmailHandler