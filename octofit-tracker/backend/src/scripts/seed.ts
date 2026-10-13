import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const avalanche = await Team.create({
      name: 'Avalanche Athletes',
      description: 'A fast-paced team focused on endurance and mobility.',
      coach: 'Coach Mira',
      totalPoints: 1120,
    });

    const summit = await Team.create({
      name: 'Summit Sprint',
      description: 'Strength and sprint specialists pushing for weekly rankings.',
      coach: 'Coach Leo',
      totalPoints: 980,
    });

    const users = await User.insertMany([
      {
        name: 'Ava Thompson',
        username: 'ava.t',
        email: 'ava.thompson@example.com',
        passwordHash: 'hash_ava',
        age: 28,
        fitnessLevel: 'advanced',
        team: avalanche._id,
        totalPoints: 420,
        badges: ['Marathon', 'Recovery'],
      },
      {
        name: 'Marcus Lee',
        username: 'marcus.lee',
        email: 'marcus.lee@example.com',
        passwordHash: 'hash_marcus',
        age: 31,
        fitnessLevel: 'advanced',
        team: summit._id,
        totalPoints: 390,
        badges: ['Sprint King', 'Core Pro'],
      },
      {
        name: 'Nia Patel',
        username: 'nia.p',
        email: 'nia.patel@example.com',
        passwordHash: 'hash_nia',
        age: 25,
        fitnessLevel: 'intermediate',
        team: avalanche._id,
        totalPoints: 350,
        badges: ['Mobility'],
      },
      {
        name: 'Ethan Brooks',
        username: 'ethan.b',
        email: 'ethan.brooks@example.com',
        passwordHash: 'hash_ethan',
        age: 26,
        fitnessLevel: 'intermediate',
        team: summit._id,
        totalPoints: 310,
        badges: ['Strength'],
      },
    ]);

    await Team.findByIdAndUpdate(avalanche._id, { members: [users[0]._id, users[2]._id] });
    await Team.findByIdAndUpdate(summit._id, { members: [users[1]._id, users[3]._id] });

    const activities = await Activity.insertMany([
      {
        user: users[0]._id,
        type: 'Run',
        description: '5K tempo run with a strong finish',
        durationMinutes: 32,
        distanceKm: 5.3,
        caloriesBurned: 420,
        date: new Date('2026-10-10T06:30:00Z'),
      },
      {
        user: users[1]._id,
        type: 'Cycling',
        description: 'Hill repeats during morning training',
        durationMinutes: 48,
        distanceKm: 18.4,
        caloriesBurned: 520,
        date: new Date('2026-10-09T17:15:00Z'),
      },
      {
        user: users[2]._id,
        type: 'Strength',
        description: 'Upper body circuit with pull-ups and rows',
        durationMinutes: 45,
        caloriesBurned: 410,
        date: new Date('2026-10-11T18:00:00Z'),
      },
      {
        user: users[3]._id,
        type: 'Yoga',
        description: 'Mobility and stretch session after practice',
        durationMinutes: 28,
        caloriesBurned: 180,
        date: new Date('2026-10-12T07:00:00Z'),
      },
    ]);

    const workouts = await Workout.insertMany([
      {
        name: 'Power Ladder',
        category: 'Strength',
        description: 'Explosive lower-body circuit with jumps and kettlebells.',
        durationMinutes: 35,
        difficulty: 'advanced',
        focusArea: ['legs', 'core'],
        coach: 'Coach Leo',
      },
      {
        name: 'Tempo Run Intervals',
        category: 'Cardio',
        description: 'Build pace control through steady state and sprint intervals.',
        durationMinutes: 40,
        difficulty: 'intermediate',
        focusArea: ['cardio', 'endurance'],
        coach: 'Coach Mira',
      },
      {
        name: 'Mobility Flow',
        category: 'Recovery',
        description: 'A balanced mobility session for joints and recovery.',
        durationMinutes: 20,
        difficulty: 'beginner',
        focusArea: ['hips', 'shoulders'],
        coach: 'Coach Mira',
      },
    ]);

    const leaderboard = await Leaderboard.insertMany([
      {
        user: users[0]._id,
        team: avalanche._id,
        score: users[0].totalPoints,
        rank: 1,
        streak: 7,
      },
      {
        user: users[1]._id,
        team: summit._id,
        score: users[1].totalPoints,
        rank: 2,
        streak: 5,
      },
      {
        user: users[2]._id,
        team: avalanche._id,
        score: users[2].totalPoints,
        rank: 3,
        streak: 4,
      },
      {
        user: users[3]._id,
        team: summit._id,
        score: users[3].totalPoints,
        rank: 4,
        streak: 3,
      },
    ]);

    console.log(`Seed complete: ${users.length} users, ${activities.length} activities, ${workouts.length} workouts, ${leaderboard.length} leaderboard entries`);
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
