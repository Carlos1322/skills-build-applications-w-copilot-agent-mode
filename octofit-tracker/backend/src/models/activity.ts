import { model, Schema, Types } from 'mongoose';

export interface ActivityRecord {
  userId?: Types.ObjectId;
  type?: string;
  durationMinutes?: number;
  distanceKm?: number;
  calories?: number;
  completedAt?: Date;
}

const activitySchema: Schema<ActivityRecord> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    type: String,
    durationMinutes: Number,
    distanceKm: Number,
    calories: Number,
    completedAt: Date,
  },
  { timestamps: true },
);

export default model('Activity', activitySchema);
