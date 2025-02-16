import { Schema, model } from "mongoose";
import { IUser } from "./user.model";

interface ITask {
  title: string;
  description?: string;
  userId: IUser;
  users?: IUser[];
  projectId?: string;
  dueDate: Date;
  status: "to-do" | "in-progress" | "completed";
}

const TaskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    projectId: { type: String },
    dueDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["to-do", "in-progress", "completed"],
      default: "to-do",
    },
  },
  { timestamps: true }
);

export default model<ITask>("Task", TaskSchema);
