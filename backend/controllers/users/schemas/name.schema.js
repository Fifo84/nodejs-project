import mongoose from "mongoose";

export const Name = new mongoose.Schema({
  first: {
    type: String,
    minLength: 2,
    maxLength: 200,
    trim: true,
    required: true,
  },
  middle: { type: String, maxLength: 200, trim: true },
  last: {
    type: String,
    minLength: 2,
    maxLength: 200,
    trim: true,
    required: true,
  },
});
