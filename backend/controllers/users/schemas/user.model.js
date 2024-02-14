import mongoose from "mongoose";
import { Name } from "./name.schema.js";
import { Image } from "./image.schema.js";
import { Address } from "./address.schema.js";
import { regexPatterns } from "../../../constants/regexPatterns.js";

const schema = new mongoose.Schema({
  name: Name,
  phone: {
    type: String,
    required: true,
    match: RegExp(regexPatterns.PHONE_REGEX),
  },
  email: {
    type: String,
    required: true,
    match: RegExp(regexPatterns.EMAIL_REGEX),
    lowercase: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    match: RegExp(regexPatterns.PASSWORD_REGEX),
  },
  image: Image,
  address: Address,
  isBusiness: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  loginAttempts: { type: Number, required: true, default: 0 },
  lockReleaseDate: { type: Date },
});

export const User = mongoose.model("users", schema);
