
import { ObjectId } from "mongodb";
import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  id: ObjectId;
  fullName: string;
  birthDate?: Date;
  email: string;
  personalDocument: number;
  createdBy: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
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
    fullName: {
      type: String,
      required: true,
    },
    personalDocument: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    updatedBy: {
      type: String,
      default: null,
    },
    birthDate: Date
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
