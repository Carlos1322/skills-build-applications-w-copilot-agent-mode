import { model, Schema, Types } from 'mongoose';

export interface LeaderboardRecord {
  userId?: Types.ObjectId;
  teamId?: Types.ObjectId;
  score?: number;
  period?: string;
}

const leaderboardSchema: Schema<LeaderboardRecord> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
    score: Number,
    period: String,
  },
  { timestamps: true },
);

export default model('Leaderboard', leaderboardSchema);
