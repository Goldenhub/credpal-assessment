import type { Request, Response } from "express";
import { handleTryCatch } from "../utils/handleTryCatch";
import { responseHandler } from "../utils/responseHandler";
import type { CreateUserDto, ForgotPasswordDto, LoginDto, ResetPasswordDto } from "./auth.dto";
import { authService } from "./auth.module";

export const register = handleTryCatch(async (req: Request, res: Response) => {
  const { username, email, password }: CreateUserDto = req.body;
  const user = await authService.register({ username, email, password });

  return responseHandler.success(res, 201, "Signup successful.", {
    username: user.username,
    email: user.email,
  });
});

export const login = handleTryCatch(async (req: Request, res: Response) => {
  const { email, password }: LoginDto = req.body;
  const accessToken = await authService.login({ email, password });

  return responseHandler.success(res, 201, "User logged in", {
    accessToken,
  });
});

export const forgotPassword = handleTryCatch(async (req: Request, res: Response) => {
  const { email }: ForgotPasswordDto = req.body;
  await authService.forgotPassword({ email });

  return responseHandler.success(res, 201, "If the email exists, a rest link has been sent");
});

export const resetPassword = handleTryCatch(async (req: Request, res: Response) => {
  const { token, newPassword }: ResetPasswordDto = req.body;
  await authService.resetPassword({ token, newPassword });

  return responseHandler.success(res, 201, "Password reset successful");
});
