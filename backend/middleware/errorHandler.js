import chalk from "chalk";
import { dotenvVariables } from "../config/dotenvService.js";
import { statusCodes } from "../constants/statusCodes.js";
import mongoose from "mongoose";
import { errorLogger } from "./logger.js";

const { NODE_ENV } = dotenvVariables;

const errorHandler = (error, req, res, next) => {
  console.log(chalk.bgRed(error));
  const statusCode = error.statusCode || 500;

  errorLogger.error({
    status: statusCode,
    message: error.message,
  });

  if (error.errorsArray) {
    return res.status(statusCode).json({
      status: "validation error",
      message: error.errorsArray,
    });
  }

  let errorResponse = {
    status: statusCode,
    message: error.message || statusCodes.STATUS_500,
  };

  if (NODE_ENV === "development" && statusCode >= 500) {
    error.details = error.stack;
  }

  switch (statusCode) {
    case 400:
      error.message =
        error instanceof mongoose.Error.CastError
          ? "Invalid ID format"
          : error.message;
      break;
    case 401:
      error.message = statusCodes.STATUS_401;
      break;
    case 403:
      error.message = statusCodes.STATUS_403;
      break;
    case 404:
      error.message = statusCodes.STATUS_404;
      break;
    case 409:
      error.message = statusCodes.STATUS_409;
      break;
    case 429:
      error.message = statusCodes.STATUS_429;
      break;
  }

  res.status(statusCode).json(errorResponse);
};

export default errorHandler;
