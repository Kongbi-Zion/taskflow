import { Schema, model } from "mongoose";
import { IUser } from "./user.model";

interface IProject {
  title: string;
  description?: string;
  userId: IUser;
  users?: IUser[];
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default model<IProject>("Project", ProjectSchema);
