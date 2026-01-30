import type { Request, Response } from "express";
import { handleTryCatch } from "../utils/handleTryCatch";
import { responseHandler } from "../utils/responseHandler";
import type { UpdateProfileDto } from "./user.dto";
import type { IAuthUser } from "./user.interface";
import { userService } from "./user.module";

export const self = handleTryCatch(async (req: Request, res: Response) => {
  const { id } = req.user as IAuthUser;

  const user = await userService.self(id);

  return responseHandler.success(res, 200, "Retrieved user record", user);
});

export const update = handleTryCatch(async (req: Request, res: Response) => {
  const { firstname, lastname }: UpdateProfileDto = req.body;
  const { id } = req.user as IAuthUser;

  const user = await userService.update(id, { firstname, lastname });

  return responseHandler.success(res, 201, "Retrieved user record", user);
});
