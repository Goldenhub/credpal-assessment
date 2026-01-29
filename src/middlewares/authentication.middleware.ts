import type { NextFunction, Request, Response } from "express";
import type { IAccessToken } from "../auth/auth.interface";
import { tokenService } from "../auth/token.service";
import { CustomError } from "../utils/customError";
import { handleTryCatch } from "../utils/handleTryCatch";

export const authenticate = handleTryCatch(async (req: Request, _res: Response, next: NextFunction) => {
  const { verifyAccessToken } = tokenService;
  let data: IAccessToken | null = null;

  const token = req.headers.authorization?.split(" ")[1] as string;

  if (!token) {
    throw new CustomError("Unauthorized", 401);
  }
  data = await verifyAccessToken<IAccessToken>(token);

  if (!data) {
    throw new CustomError("Unauthorized", 401);
  }
  req.user = { id: data.sub, email: data.email, username: data.username, firstname: data.firstname, lastname: data.lastname };
  next();
});
