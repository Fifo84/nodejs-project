import chalk from "chalk";
import { User } from "../schemas/user.model.js";
import { editUserValid } from "../../../utils/validation/users.validation/editUserValidation.js";
import { getTokenParams } from "../../../utils/getTokenParams.js";
import mongoose from "mongoose";

const editUser = async (req, res, next) => {
  try {
    const { userId } = getTokenParams(req, res);
    const { id } = req.params;

    const editValidation = editUserValid.validate(req.body, {
      abortEarly: false,
      allowUnknown: false,
    });

    if (editValidation.error) {
      const editErrors = editValidation.error.details.map((err) => err.message);
      const error = new Error(editErrors);
      error.statusCode = 400;
      error.errorsArray = editErrors;
      console.log(chalk.bgRed(editErrors));
      return next(error);
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error("Invalid ID format");
      error.statusCode = 400;
      return next(error);
    }

    if (id !== userId) {
      const error = new Error("User not authorized to edit other users");
      error.statusCode = 403;
      return next(error);
    }

    const editUserForm = req.body;

    const registeredUser = await User.findOne({ _id: id });

    if (!registeredUser) {
      const error = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }

    registeredUser.set(editUserForm);

    const updateUser = await registeredUser.save();
    res
      .status(200)
      .json({ message: "User details updated successfully", user: updateUser });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      const error = new Error(
        "The email is taken. please choose another email address"
      );
      error.statusCode = 409;
      next(error);
    } else {
      next(error);
    }
  }
};

export default editUser;
