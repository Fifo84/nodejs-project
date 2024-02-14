import Joi from "joi";
import { regexPatterns } from "../../../constants/regexPatterns.js";

export const loginValid = Joi.object({
  email: Joi.string()
    .ruleset.regex(regexPatterns.EMAIL_REGEX)
    .rule({ message: "Email must be a valid email address" })
    .required(),
  password: Joi.string()
    .min(6)
    .regex(regexPatterns.PASSWORD_REGEX)
    .rule({
      message:
        "password must have at least 6 charecters, 1 capital letter, 1 lowercase letter, 1 special character(!@#$%^&*-), and 1 numeric character.",
    })
    .required(),
});
