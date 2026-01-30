import { CustomError } from "../utils/customError";
import type { CreateTodoDto, UpdateTodoDto } from "./todo.dto";
import type { TodoRepository } from "./todo.repository";

export class TodoService {
  constructor(private readonly todoRepo: TodoRepository) {}

  async getTodos(userId: string) {
    const todos = await this.todoRepo.findAll(userId);

    return todos;
  }

  async getTodoById(id: string, userId: string) {
    const todo = await this.todoRepo.findById(id);

    if (!todo) {
      throw new CustomError("Todo not found", 404);
    }

    if (!todo.userId.equals(userId)) {
      throw new CustomError("Forbidden to perform action", 403);
    }

    return todo;
  }

  async create(userId: string, input: CreateTodoDto) {
    const todo = this.todoRepo.create({
      ...input,
      userId,
    });

    return todo;
  }

  async update(id: string, payload: UpdateTodoDto, userId: string) {
    const todo = await this.todoRepo.findById(id);

    if (!todo) {
      throw new CustomError("Invalid request", 400);
    }

    if (!todo.userId.equals(userId)) {
      throw new CustomError("Forbidden to perform action", 403);
    }

    const updatedTodo = this.todoRepo.update(id, payload);

    return updatedTodo;
  }

  async delete(id: string, userId: string) {
    const todo = await this.todoRepo.findById(id);

    if (!todo) {
      throw new CustomError("Invalid request", 400);
    }

    if (!todo.userId.equals(userId)) {
      throw new CustomError("Forbidden to perform action", 403);
    }

    const response = await this.todoRepo.delete(id);

    if (!response) {
      throw new CustomError("An issue was encountered while deleting the todo");
    }

    return response;
  }
}
