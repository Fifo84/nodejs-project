import mongoose from "mongoose";
import { regexPatterns } from "../../../constants/regexPatterns.js";

export const Image = new mongoose.Schema({
  url: {
    type: String,
    match: RegExp(regexPatterns.URL_REGEX),
    trim: true,
    lowercase: true,
  },
  alt: {
    type: String,
    maxLength: 200,
    trim: true,
    default: "alt",
  },
});
