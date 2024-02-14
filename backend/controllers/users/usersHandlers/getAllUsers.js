import { getTokenParams } from "../../../utils/getTokenParams.js";
import { User } from "../schemas/user.model.js";

const getAllUsers = async (req, res, next) => {
  try {
    const { isAdmin } = getTokenParams(req, res);

    if (!isAdmin) {
      const error = new Error("User not authorized");
      error.statusCode = 403;
      return next(error);
    }
    const users = await User.find().select("-password");

    res.status(200).json({users});
  } catch (error) {
    return next(error);
  }
};

export default getAllUsers;
