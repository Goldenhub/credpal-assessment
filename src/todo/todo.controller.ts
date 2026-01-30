import type { Request, Response } from "express";
import type { IAuthUser } from "../user/user.interface";
import { handleTryCatch } from "../utils/handleTryCatch";
import { responseHandler } from "../utils/responseHandler";
import type { CreateTodoDto, UpdateTodoDto } from "./todo.dto";
import { todoService } from "./todo.module";

export const getTodos = handleTryCatch(async (req: Request, res: Response) => {
  const { id: userId } = req.user as IAuthUser;

  const todo = await todoService.getTodos(userId);

  return responseHandler.success(res, 200, "todos fetched", todo);
});

export const getTodoById = handleTryCatch(async (req: Request, res: Response) => {
  const { id: userId } = req.user as IAuthUser;
  const id = req.params.id as string;

  const todo = await todoService.getTodoById(id, userId);

  return responseHandler.success(res, 200, "todo fetched", todo);
});

export const create = handleTryCatch(async (req: Request, res: Response) => {
  const { title, content }: CreateTodoDto = req.body;
  const { id } = req.user as IAuthUser;

  const todo = await todoService.create(id, { title, content });

  return responseHandler.success(res, 201, "todo created", todo);
});

export const update = handleTryCatch(async (req: Request, res: Response) => {
  const { title, content, completed }: UpdateTodoDto = req.body;
  const { id: userId } = req.user as IAuthUser;
  const id = req.params.id as string;

  const todo = await todoService.update(id, { title, content, completed }, userId);

  return responseHandler.success(res, 200, "Retrieved user record", todo);
});

export const deleteTodo = handleTryCatch(async (req: Request, res: Response) => {
  const { id: userId } = req.user as IAuthUser;
  const id = req.params.id as string;

  await todoService.delete(id, userId);

  return responseHandler.success(res, 204, "Retrieved user record");
});
