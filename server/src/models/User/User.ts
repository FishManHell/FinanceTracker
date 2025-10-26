import mongoose, { Schema } from "mongoose";
import { IUserDocument } from './User.types.js'

const UserSchema = new Schema<IUserDocument>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  email: { type: String },
});

export const User = mongoose.model<IUserDocument>("User", UserSchema);
