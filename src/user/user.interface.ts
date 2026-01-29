export interface IUser {
  id: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  username: string;
}

export interface IUserRepository {
  create(user: Partial<IUser>): Promise<IUser>;
  update(id: string, data: Partial<IUser>): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  findById(id: string): Promise<IUser | null>;
}
