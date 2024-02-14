import mongoose from "mongoose";
import { regexPatterns } from "../../../constants/regexPatterns.js";

export const Address = new mongoose.Schema({
  state: { type: String, maxLength: 200, trim: true },
  country: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 100,
    lowercase: true,
  },
  city: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 100,
    lowercase: true,
  },
  street: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 100,
    lowercase: true,
  },
  houseNumber: { type: Number, required: true, trim: true, minLength: 1 },
  zip: {
    type: String,
    match: RegExp(regexPatterns.ZIP_REGEX),
    trim: true,
    default: 0,
  },
});
