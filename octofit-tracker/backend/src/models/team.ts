import { model, Schema, Types } from 'mongoose';

export interface TeamRecord {
  name?: string;
  description?: string;
  memberIds?: Types.ObjectId[];
}

const teamSchema: Schema<TeamRecord> = new Schema(
  {
    name: String,
    description: String,
    memberIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

export default model('Team', teamSchema);
