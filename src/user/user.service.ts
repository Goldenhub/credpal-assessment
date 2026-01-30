import type { UpdateProfileDto } from "./user.dto";
import type { UserRepository } from "./user.repository";

export class UserService {
  constructor(private readonly userRepo: UserRepository) {}
  async self(id: string) {
    const user = this.userRepo.findById(id);

    return user;
  }

  async update(id: string, payload: UpdateProfileDto) {
    const user = this.userRepo.update(id, payload);

    return user;
  }
}
