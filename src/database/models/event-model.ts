
import { ObjectId } from "mongodb";
import mongoose, { Document, Schema } from "mongoose";

export interface IEvent extends Document {
  id: ObjectId;
  title: string;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt?: Date;
}

const eventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      index: true,
    },
    createdBy: String,
    updatedBy: String,
  },
  {
    toJSON: { 
      transform(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
    collection: 'events',
    timestamps: true,
  }
);

export const EventModel = mongoose.model<IEvent>("Event", eventSchema);
