import type { Types } from "mongoose";

export interface ITodo {
  title: string;
  content: string;
  completed: boolean;
  userId: Types.ObjectId;
}
export interface ICreateTodo {
  title: string;
  content: string;
  userId: string;
}

export interface ITodoRepository {
  create(todo: ICreateTodo): Promise<ITodo>;
  findById(id: string): Promise<ITodo | null>;
  update(id: string, data: Partial<ITodo>): Promise<ITodo | null>;
  delete(id: string): Promise<boolean>;
}
