import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  id: string;
  userName: string;
  email: string;
  createdAt: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      default: new mongoose.Types.ObjectId(),
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    userName: {
      type: String,
      required: true,
    }    
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
