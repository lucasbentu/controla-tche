import mongoose, { Document, Schema } from "mongoose";

export interface IAuth extends Document {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt?: Date;
}

const authSchema = new Schema<IAuth>(
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
    passwordHash: {
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
    collection: 'auths',
    timestamps: true,
  }
);

export const AuthModel = mongoose.model<IAuth>("Auth", authSchema);
