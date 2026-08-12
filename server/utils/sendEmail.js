import nodemailer from "nodemailer";

const sendEmail = async (email, verificationCode) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Test Email",
      text: `
Hello,

Thank you for signing up.

Your email verification code is:

${verificationCode}

This code will expire in 2 minutes.

If you did not create this account, you can safely ignore this email.

Regards,
Inventory Management Team
`,
    });
    console.log(email)
    console.log("email sent");
    console.log(process.env.EMAIL_USER);
    console.log(process.env.EMAIL_PASS);
  } catch (error) {
    console.error(error);
  }
};
export default sendEmail;
