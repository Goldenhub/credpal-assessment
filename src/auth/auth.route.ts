import express from "express";
import { authenticate, validate } from "../middlewares";
import { self } from "../user/user.controller";
import { forgotPassword, login, register, resetPassword } from "./auth.controller";

const authRouter = express.Router();

authRouter.post("/register", validate.register, register);
authRouter.post("/login", validate.login, login);
authRouter.post("/forgot-password", validate.forgotPassword, forgotPassword);
authRouter.post("/reset-password", validate.resetPassword, resetPassword);
authRouter.post("/me", authenticate, self);

export default authRouter;
