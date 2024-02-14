import Joi from "joi";
import { regexPatterns } from "../../../constants/regexPatterns.js";

export const editUserValid = Joi.object({
  name: Joi.object({
    first: Joi.string().min(2).max(200).required(),
    middle: Joi.string().min(2).max(200).optional().allow(""),
    last: Joi.string().min(2).max(200).required(),
  }).required(),
  phone: Joi.string()
    .ruleset.regex(regexPatterns.PHONE_REGEX)
    .rule({ message: "Phone number must be a valid phone number" })
    .required(),
  email: Joi.string()
    .ruleset.regex(regexPatterns.EMAIL_REGEX)
    .rule({ message: "Email must be a valid email address" })
    .required(),
  address: Joi.object({
    state: Joi.string().optional().allow(""),
    country: Joi.string().min(2).max(200).required(),
    city: Joi.string().min(2).max(200).required(),
    street: Joi.string().min(2).max(200).required(),
    houseNumber: Joi.number().required(),
    zip: Joi.string()
      .ruleset.regex(regexPatterns.ZIP_REGEX)
      .rule({ message: "zip code must be a valid zip code" })
      .optional(),
  }).required(),
  image: Joi.object({
    url: Joi.string()
      .ruleset.regex(regexPatterns.URL_REGEX)
      .rule({ message: "Image url must be a valid url" })
      .optional()
      .allow(""),
    alt: Joi.string().min(2).max(200).optional().allow(""),
  }),
});
