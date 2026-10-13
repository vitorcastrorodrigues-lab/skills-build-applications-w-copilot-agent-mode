import mongoose, { Schema } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    team: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
      required: false,
    },
    score: {
      type: Number,
      required: true,
      default: 0,
    },
    rank: {
      type: Number,
      required: true,
      min: 1,
    },
    streak: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);
