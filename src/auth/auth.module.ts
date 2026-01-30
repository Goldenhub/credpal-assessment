import { UserRepository } from "../user/user.repository";
import { AuthService } from "./auth.service";

const userRepository = new UserRepository();
export const authService = new AuthService(userRepository);
