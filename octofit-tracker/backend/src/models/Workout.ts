import mongoose, { Schema } from 'mongoose';

const workoutSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    durationMinutes: {
      type: Number,
      required: true,
      min: 10,
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    focusArea: {
      type: [String],
      default: [],
    },
    coach: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Workout = mongoose.model('Workout', workoutSchema);
