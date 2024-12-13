
import { ObjectId } from "mongodb";
import mongoose, { Document, Schema } from "mongoose";

export interface IEvent extends Document {
  id: ObjectId;
  eventName: string
  eventDate: Date
  estimatedParticipants: number
  averageFee: number
  company: string
  description: string | null
  bannerUrl: string | null
  responsible: string
  email: string
  phone: number
  dateSubscribedStart: Date
  dateSubscribedEnd: Date
  createdBy: string
  updatedBy?: string
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new Schema<IEvent>(
  {
    eventName: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    eventDate: Date,
    estimatedParticipants: Number,
    averageFee: Number,
    company: String,
    description: {
      type: String,
      default: null,
      nullable: true
    },
    bannerUrl: {
      type: String,
      default: null,
      nullable: true
    },
    responsible: String,
    email: String,
    phone: String,
    dateSubscribedStart: Date,
    dateSubscribedEnd: Date,
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
