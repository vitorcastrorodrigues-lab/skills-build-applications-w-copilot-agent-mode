import mongoose, { Schema } from 'mongoose';

const teamSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    coach: {
      type: String,
      trim: true,
    },
    members: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
    totalPoints: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export const Team = mongoose.model('Team', teamSchema);
