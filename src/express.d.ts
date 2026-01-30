import type { IAuthUser } from "./user/user.interface";

declare global {
  namespace Express {
    interface Request {
      user?: IAuthUser;
    }
  }
}
