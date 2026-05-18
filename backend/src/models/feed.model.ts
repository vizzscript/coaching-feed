import mongoose, { Document, Schema } from 'mongoose';

export interface IFeed extends Document {
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const feedSchema = new Schema<IFeed>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Optimize retrieval of latest feeds
feedSchema.index({ createdAt: -1 });

export default mongoose.model<IFeed>('Feed', feedSchema);
