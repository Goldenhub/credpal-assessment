import { model, Schema, Types } from "mongoose";
import { cleanJSON } from "../utils/helpers";
import type { ITodo } from "./todo.interface";

const todoSchema = new Schema<ITodo>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
);

todoSchema.set("toJSON", {
  transform: (_doc, ret) => {
    return cleanJSON(ret);
  },
});

export const TodoModel = model<ITodo>("Todo", todoSchema);
