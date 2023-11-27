
import { ObjectId } from "mongodb";
import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  id: ObjectId;
  username: string;
  birthDay: string;
  email: string;
  createdAt: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    username: {
      type: String,
      required: true,
    },
    birthDay: String
  },
  {
    toJSON: { 
      transform(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
    collection: 'users',
    timestamps: true,
  }
);

export const UserModel = mongoose.model<IUser>("User", userSchema);
