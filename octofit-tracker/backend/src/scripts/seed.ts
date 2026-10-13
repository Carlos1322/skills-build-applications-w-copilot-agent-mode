import mongoose, { Types } from 'mongoose';
import Activity from '../models/activity';
import Leaderboard from '../models/leaderboard';
import Team from '../models/team';
import User from '../models/user';
import Workout from '../models/workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const user = User;
const team = Team;
const activity = Activity;
const leaderboard = Leaderboard;
const workout = Workout;

const ids = {
  users: ['650000000000000000000001', '650000000000000000000002', '650000000000000000000003', '650000000000000000000004'].map(
    (id) => new Types.ObjectId(id),
  ),
  teams: ['650000000000000000000011', '650000000000000000000012'].map((id) => new Types.ObjectId(id)),
  activities: [
    '650000000000000000000021',
    '650000000000000000000022',
    '650000000000000000000023',
    '650000000000000000000024',
    '650000000000000000000025',
    '650000000000000000000026',
  ].map((id) => new Types.ObjectId(id)),
  leaderboard: [
    '650000000000000000000031',
    '650000000000000000000032',
    '650000000000000000000033',
    '650000000000000000000034',
  ].map((id) => new Types.ObjectId(id)),
  workouts: [
    '650000000000000000000041',
    '650000000000000000000042',
    '650000000000000000000043',
    '650000000000000000000044',
  ].map((id) => new Types.ObjectId(id)),
};

async function seedDatabase(): Promise<void> {
  // Seed the octofit_db database with test data
  await mongoose.connect(connectionString);

  try {
    console.log('Connected to octofit_db');

    await Promise.all([
      user.deleteMany({ _id: { $in: ids.users } }),
      team.deleteMany({ _id: { $in: ids.teams } }),
      activity.deleteMany({ _id: { $in: ids.activities } }),
      leaderboard.deleteMany({ _id: { $in: ids.leaderboard } }),
      workout.deleteMany({ _id: { $in: ids.workouts } }),
    ]);

    const teams = [
      {
        _id: ids.teams[0],
        name: 'Trail Blazers',
        description: 'A team focused on running, hiking, and exploring outdoors.',
        memberIds: [ids.users[0], ids.users[1]],
      },
      {
        _id: ids.teams[1],
        name: 'Strength Squad',
        description: 'A supportive group building strength one workout at a time.',
        memberIds: [ids.users[2], ids.users[3]],
      },
    ];
    const users = [
      { _id: ids.users[0], name: 'Avery Morgan', username: 'averym', email: 'avery@example.com', teamId: ids.teams[0] },
      { _id: ids.users[1], name: 'Jordan Lee', username: 'jordanl', email: 'jordan@example.com', teamId: ids.teams[0] },
      { _id: ids.users[2], name: 'Sam Rivera', username: 'samr', email: 'sam@example.com', teamId: ids.teams[1] },
      { _id: ids.users[3], name: 'Taylor Kim', username: 'taylork', email: 'taylor@example.com', teamId: ids.teams[1] },
    ];
    const activities = [
      { _id: ids.activities[0], userId: ids.users[0], type: 'running', durationMinutes: 32, distanceKm: 5.2, calories: 360 },
      { _id: ids.activities[1], userId: ids.users[1], type: 'walking', durationMinutes: 45, distanceKm: 3.8, calories: 210 },
      { _id: ids.activities[2], userId: ids.users[2], type: 'strength training', durationMinutes: 50, calories: 290 },
      { _id: ids.activities[3], userId: ids.users[3], type: 'cycling', durationMinutes: 40, distanceKm: 12.5, calories: 410 },
      { _id: ids.activities[4], userId: ids.users[0], type: 'yoga', durationMinutes: 25, calories: 100 },
      { _id: ids.activities[5], userId: ids.users[2], type: 'running', durationMinutes: 28, distanceKm: 4.6, calories: 320 },
    ].map((entry, index) => ({
      ...entry,
      completedAt: new Date(Date.now() - index * 24 * 60 * 60 * 1000),
    }));
    const leaderboardEntries = [
      { _id: ids.leaderboard[0], userId: ids.users[0], teamId: ids.teams[0], score: 1240, period: '2026-10' },
      { _id: ids.leaderboard[1], userId: ids.users[2], teamId: ids.teams[1], score: 1105, period: '2026-10' },
      { _id: ids.leaderboard[2], userId: ids.users[1], teamId: ids.teams[0], score: 980, period: '2026-10' },
      { _id: ids.leaderboard[3], userId: ids.users[3], teamId: ids.teams[1], score: 875, period: '2026-10' },
    ];
    const workouts = [
      {
        _id: ids.workouts[0],
        title: 'Beginner Run Builder',
        description: 'A steady session to build aerobic endurance.',
        difficulty: 'beginner',
        exercises: ['5-minute brisk walk', '20-minute easy run', '5-minute cooldown walk'],
      },
      {
        _id: ids.workouts[1],
        title: 'Full-Body Strength',
        description: 'A balanced strength session using bodyweight movements.',
        difficulty: 'intermediate',
        exercises: ['Squats: 3 x 12', 'Push-ups: 3 x 10', 'Glute bridges: 3 x 15', 'Plank: 3 x 30 seconds'],
      },
      {
        _id: ids.workouts[2],
        title: 'Mobility Reset',
        description: 'A gentle routine to improve mobility and recover.',
        difficulty: 'beginner',
        exercises: ['Cat-cow: 10 reps', 'Low lunge: 30 seconds per side', 'Hamstring stretch: 30 seconds per side'],
      },
      {
        _id: ids.workouts[3],
        title: 'Cardio Intervals',
        description: 'Short effort intervals to develop cardiovascular fitness.',
        difficulty: 'advanced',
        exercises: ['5-minute warm-up', '6 x 2-minute fast / 2-minute easy', '5-minute cooldown'],
      },
    ];

    await user.insertMany(users);
    await team.insertMany(teams);
    await activity.insertMany(activities);
    await leaderboard.insertMany(leaderboardEntries);
    await workout.insertMany(workouts);

    console.log(
      `Seeded ${users.length} users, ${teams.length} teams, ${activities.length} activities, ${leaderboardEntries.length} leaderboard entries, and ${workouts.length} workouts.`,
    );
    console.log('Database seeding complete');
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase().catch((error: unknown) => {
  console.error('Error seeding database:', error);
  process.exitCode = 1;
});
