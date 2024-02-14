import jwt from "jsonwebtoken";
import { dotenvVariables } from "../config/dotenvService.js";

const { JWT_SECRET } = dotenvVariables;

export const getTokenParams = (req, res) => {
  if (!req.headers.authorization) {
    return null;
  }

  const data = jwt.verify(req.headers.authorization, JWT_SECRET);

  if (!data) {
    return res.status(401).send("User not authorized");
  }

  return data;
};
