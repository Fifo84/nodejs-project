import mongoose from "mongoose";
import { Image } from "./image.schema.js";
import { Address } from "./address.schema.js";
import { regexPatterns } from "../../../constants/regexPatterns.js";

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 120,
    trim: true,
  },
  subtitle: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 120,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 400,
    trim: true,
  },
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
    unique: false,
  },
  web: {
    type: String,
    required: true,
    match: RegExp(regexPatterns.URL_REGEX),
    trim: true,
    lowercase: true,
  },
  image: Image,
  address: Address,
  bizNumber: {
    type: Number,
    required: true,
    trim: true,
    min: 1000000,
    max: 9999999,
  },
  like: [String],
  user_id: { type: mongoose.Types.ObjectId },
  createdAt: { type: Date, default: Date.now },
});

export const Card = mongoose.model("cards", schema);
