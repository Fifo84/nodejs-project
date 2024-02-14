import { dotenvVariables } from "../config/dotenvService.js";
import jwt from "jsonwebtoken";

const { JWT_SECRET } = dotenvVariables;

export const guard = (req, res, next) => {
  try {
    jwt.verify(req.headers.authorization, JWT_SECRET, (err, data) => {
      if (err) {
        const error = new Error("User not logged in");
        error.statusCode = 401;
        next(error);
      } else {
        next();
      }
    });
  } catch (error) {
    next(error);
  }
};
