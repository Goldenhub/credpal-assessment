import express from "express";
import { authenticate, validate } from "../middlewares";
import { update } from "../user/user.controller";

const userRouter = express.Router();

userRouter.patch("/", authenticate, validate.updateUser, update);

export default userRouter;
