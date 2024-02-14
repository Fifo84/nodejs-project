import Joi from "joi";
import { regexPatterns } from "../../../constants/regexPatterns.js";

export const cardValid = Joi.object({
  title: Joi.string().required().min(2).max(120),
  subtitle: Joi.string().required().min(2).max(120),
  description: Joi.string().required().min(3).max(400),
  phone: Joi.string()
    .ruleset.regex(regexPatterns.PHONE_REGEX)
    .rule({ message: "Phone number must be a valid phone number" })
    .required(),
  email: Joi.string()
    .ruleset.regex(regexPatterns.EMAIL_REGEX)
    .rule({ message: "Email must be a valid email address" })
    .required(),
  web: Joi.string()
    .ruleset.regex(regexPatterns.URL_REGEX)
    .rule({ message: "web url must contain a valid url" })
    .required(),
  image: Joi.object({
    url: Joi.string()
      .ruleset.regex(regexPatterns.URL_REGEX)
      .rule({ message: "Image url must be a valid url" })
      .optional()
      .allow(""),
    alt: Joi.string().max(200).allow(""),
  }),
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
});
