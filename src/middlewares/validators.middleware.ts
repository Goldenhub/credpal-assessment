import type { NextFunction, Request, Response } from "express";
import { CreateUserDto, ForgotPasswordDto, LoginDto, ResetPasswordDto } from "../auth/auth.dto";
import { validator } from "../utils/validator";
import { UpdateProfileDto } from "../user/user.dto";
import { CreateTodoDto, UpdateTodoDto } from "../todo/todo.dto";

export const validate = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    return validator(req, res, next, CreateUserDto);
  },
  login: async (req: Request, res: Response, next: NextFunction) => {
    return validator(req, res, next, LoginDto);
  },
  forgotPassword: async (req: Request, res: Response, next: NextFunction) => {
    return validator(req, res, next, ForgotPasswordDto);
  },
  resetPassword: async (req: Request, res: Response, next: NextFunction) => {
    return validator(req, res, next, ResetPasswordDto);
  },
  // User
  updateUser: async (req: Request, res: Response, next: NextFunction) => {
    return validator(req, res, next, UpdateProfileDto);
  },
  // Todo
  createTodo: async (req: Request, res: Response, next: NextFunction) => {
    return validator(req, res, next, CreateTodoDto);
  },
  updateTodo: async (req: Request, res: Response, next: NextFunction) => {
    return validator(req, res, next, UpdateTodoDto);
  },
};
