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
import addUser from "../handlers/userHandlers/addUser.js";
import getAllUser from "../handlers/userHandlers/getAllUser.js";
import deleteUserHandler from "../handlers/userHandlers/deleteUser.js";

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
userRoutes.post('/add-member',authMiddleware,addUser)
userRoutes.get('/all',authMiddleware,getAllUser)
userRoutes.delete('/delete/:id',authMiddleware,deleteUserHandler)

export default userRoutes;
