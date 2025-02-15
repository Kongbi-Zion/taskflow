import { Schema, model } from "mongoose";
import { IUser } from "./user.model";

interface IToken {
  userId: IUser;
  token: string;
  type: "reset" | "auth";
  expiresAt: Date;
}

const TokenSchema = new Schema<IToken>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    token: { type: String, required: true },
    type: { type: String, enum: ["reset", "auth"], required: true },
    expiresAt: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true }
);

export default model<IToken>("Token", TokenSchema);
