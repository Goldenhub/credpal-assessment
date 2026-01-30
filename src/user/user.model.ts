import { model, Schema } from "mongoose";
import { cleanJSON, hashPassword } from "../utils/helpers";
import type { IUser } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    username: {
      type: String,
      required: false,
      lowercase: true,
      trim: true,
    },
    firstname: {
      type: String,
      required: false,
      lowercase: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: false,
      lowercase: true,
      trim: true,
    },
    profileUpdated: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: {
      type: String,
      required: false,
    },
    resetPasswordExpires: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await hashPassword(this.password);
});

userSchema.set("toJSON", {
  transform: (_doc, ret) => {
    return cleanJSON(ret);
  },
});

export const UserModel = model<IUser>("User", userSchema);
