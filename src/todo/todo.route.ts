import express from "express";
import { authenticate, validate } from "../middlewares";
import { create, deleteTodo, getTodoById, getTodos, update } from "./todo.controller";

const todoRouter = express.Router();

todoRouter.get("/", authenticate, getTodos);
todoRouter.get("/:id", authenticate, getTodoById);
todoRouter.post("/", authenticate, validate.createTodo, create);
todoRouter.put("/:id", authenticate, validate.updateTodo, update);
todoRouter.delete("/:id", authenticate, deleteTodo);

export default todoRouter;
