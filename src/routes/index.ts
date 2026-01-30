import express from "express";
import authRouter from "../auth/auth.route";
import todoRouter from "../todo/todo.route";
import userRouter from "../user/user.route";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/todos", todoRouter);

export default router;
