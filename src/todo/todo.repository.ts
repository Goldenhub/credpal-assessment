import { Types } from "mongoose";
import type { ICreateTodo, ITodo, ITodoRepository } from "./todo.interface";
import { TodoModel } from "./todo.model";

export class TodoRepository implements ITodoRepository {
  async create(todo: ICreateTodo): Promise<ITodo> {
    return TodoModel.create({
      ...todo,
      userId: new Types.ObjectId(todo.userId),
    });
  }

  async findAll(userId: string): Promise<ITodo[]> {
    return TodoModel.find({ userId: new Types.ObjectId(userId) }).exec();
  }

  async findById(id: string): Promise<ITodo | null> {
    return TodoModel.findById(id).exec();
  }

  async findByUserId(userId: string): Promise<ITodo[]> {
    return TodoModel.find({ userId }).exec();
  }

  async update(id: string, data: Partial<ITodo>): Promise<ITodo | null> {
    return TodoModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const res = await TodoModel.findByIdAndDelete(id).exec();
    return !!res;
  }
}
