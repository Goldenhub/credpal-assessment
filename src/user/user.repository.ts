import type { IUser, IUserRepository } from "./user.interface";
import { UserModel } from "./user.model";

export class UserRepository implements IUserRepository {
  async create(user: Partial<IUser>): Promise<IUser> {
    return UserModel.create(user);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email }).select("+password").exec();
  }

  async update(id: string, data: Partial<IUser>): Promise<IUser | null> {
    return UserModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async findById(id: string): Promise<IUser | null> {
    return UserModel.findById(id).exec();
  }

  async find(qry: Record<string, string>) {
    return UserModel.find(qry).exec();
  }

  async findOne(qry: Record<string, string | object>) {
    return UserModel.findOne(qry).exec();
  }
}
