import mongoose from "mongoose";
import { getTokenParams } from "../../../utils/getTokenParams.js";
import { User } from "../schemas/user.model.js";

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isAdmin, userId } = getTokenParams(req, res);
    if (!isAdmin && id !== userId) {
      const error = new Error("Not authorized to delete user");
      error.statusCode = 403;
      return next(error);
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error("Invalid ID format");
      error.statusCode = 400;
      return next(error);
    }

    const userDelete = await User.findByIdAndDelete(id);

    if (!userDelete) {
      const error = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({ message: "User deleted successfully!" });
  } catch (error) {
    console.log("Delete error:", error);
    next(error);
  }
};
export default deleteUser;
