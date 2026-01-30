import type { Document } from "mongoose";

export interface IUser extends Document {
  id: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  username: string;
  profileUpdated: boolean;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
}

export interface IAuthUser {
  id: string;
  email: string;
  username: string;
  profileUpdated: boolean;
}

export interface IUserRepository {
  create(user: Partial<IUser>): Promise<IUser>;
  update(id: string, data: Partial<IUser>): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  findById(id: string): Promise<IUser | null>;
}
