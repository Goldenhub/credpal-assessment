import type { ITodo, ITodoRepository } from "./todo.interface";
import { TodoModel } from "./todo.model";

export class TodoRepository implements ITodoRepository {
  async create(todo: Partial<ITodo>): Promise<ITodo> {
    return TodoModel.create(todo);
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
