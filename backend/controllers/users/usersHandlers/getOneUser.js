import { User } from "../schemas/user.model.js";
import { getTokenParams } from "../../../utils/getTokenParams.js";
import mongoose from "mongoose";

const getOneUser = async (req, res, next) => {
  try {
    const { userId, isAdmin } = getTokenParams(req, res);
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error("Invalid user ID format");
      error.statusCode = 400;
      return next(error);
    }

    const requestedUser = await User.findById(id).select("-password ");
    if (!requestedUser) {
      const error = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }
    if (!isAdmin && userId !== id) {
      const error = new Error("User not Authorized");
      error.statusCode = 403;
      return next(error);
    }

    res.status(200).json(requestedUser);
  } catch (error) {
    next(error);
  }
};

export default getOneUser;
