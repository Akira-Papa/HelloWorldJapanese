import mongoose, { Schema } from 'mongoose';

export interface IMemo {
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const MemoSchema = new Schema<IMemo>(
  {
    content: {
      type: String,
      required: [true, 'Please enter memo content'],
    },
  },
  {
    timestamps: true,
  }
);

export const Memo = mongoose.models.Memo || mongoose.model<IMemo>('Memo', MemoSchema);
