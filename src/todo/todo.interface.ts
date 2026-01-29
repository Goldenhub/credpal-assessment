import type { Types } from "mongoose";

export interface ITodo {
  title: string;
  completed: boolean;
  userId: Types.ObjectId;
}

export interface ITodoRepository {
  create(todo: Partial<ITodo>): Promise<ITodo>;
  findById(id: string): Promise<ITodo | null>;
  update(id: string, data: Partial<ITodo>): Promise<ITodo | null>;
  delete(id: string): Promise<boolean>;
}
