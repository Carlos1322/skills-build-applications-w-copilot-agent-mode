import { model, Schema, Types } from 'mongoose';

export interface UserRecord {
  name?: string;
  username?: string;
  email?: string;
  passwordHash?: string;
  teamId?: Types.ObjectId;
}

const userSchema: Schema<UserRecord> = new Schema(
  {
    name: String,
    username: String,
    email: String,
    passwordHash: String,
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
  },
  { timestamps: true },
);

export default model('User', userSchema);
