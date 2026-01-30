import { TodoRepository } from "../todo/todo.repository";
import { TodoService } from "./todo.service";

const todoRepository = new TodoRepository();
export const todoService = new TodoService(todoRepository);
