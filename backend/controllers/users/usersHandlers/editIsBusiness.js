import mongoose from "mongoose";
import { getTokenParams } from "../../../utils/getTokenParams.js";
import { User } from "../schemas/user.model.js";

const editIsBusiness = async (req, res, next) => {
  try {
    const { userId } = getTokenParams(req, res);
    const { id } = req.params;

    if (userId !== id) {
      const error = new Error("User not Authorized");
      error.statusCode = 403;
      return next(error);
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error("Invalid ID format");
      error.statusCode = 400;
      return next(error);
    }

    const user = await User.findById(id);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }

    user.isBusiness = !user.isBusiness;
    await user.save();

    res
      .status(200)
      .json({ message: "User business status updated successfully" });
  } catch (error) {
    console.log("changing isBusiness error:", error);
    next(error);
  }
};

export default editIsBusiness;
