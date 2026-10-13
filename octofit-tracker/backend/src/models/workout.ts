import { model, Schema } from 'mongoose';

export interface WorkoutRecord {
  title?: string;
  description?: string;
  difficulty?: string;
  exercises?: string[];
}

const workoutSchema: Schema<WorkoutRecord> = new Schema(
  {
    title: String,
    description: String,
    difficulty: String,
    exercises: [String],
  },
  { timestamps: true },
);

export default model('Workout', workoutSchema);
