import express from "express";
import signupHandler from "../handlers/userHandlers/signupHandler.js";
import loginHandler from "../handlers/userHandlers/loginHandler.js";
import logoutHandler from "../handlers/userHandlers/logoutHandler.js";
import dashboardHandler from "../handlers/userHandlers/dashboardHandler.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import verifyEmailHandler from "../handlers/userHandlers/verifyEmailHandler.js";
import sendOtpHandler from "../handlers/userHandlers/sendOtpHandler.js";
import resetPasswordHandler from "../handlers/userHandlers/resetPasswordHandler.js";
import verfiyResetOtpHandler from "../handlers/userHandlers/verifyResetOtpHandler.js";
import getCurrentUserHandler from "../handlers/userHandlers/getCurrentUserHandler.js";

const userRoutes = express.Router();

userRoutes.post("/signup", signupHandler);
userRoutes.post("/login", loginHandler);
userRoutes.post("/logout",logoutHandler);
userRoutes.get('/dashboard',authMiddleware,dashboardHandler)
userRoutes.post('/verify-email',verifyEmailHandler)
userRoutes.post('/otp',sendOtpHandler)
userRoutes.post('/reset-password',resetPasswordHandler)
userRoutes.post('/verify-otp',verfiyResetOtpHandler)
userRoutes.get('/me',authMiddleware,getCurrentUserHandler)

export default userRoutes;
