import bcrypt from "bcrypt";
import { signUpValid } from "../../utils/validation/users.validation/signupValidation.js";
import { User } from "../users/schemas/user.model.js";

const signup = async (req, res, next) => {
  try {
    const signupForm = req.body;

    const signupValidation = signUpValid.validate(signupForm, {
      abortEarly: false,
    });

    if (signupValidation.error) {
      const signupErrors = signupValidation.error.details.map(
        (err) => err.message
      );
      const error = new Error(signupErrors);
      error.statusCode = 400;
      error.errorsArray = signupErrors;
      return next(error);
    }

    const { password } = signupForm;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      ...signupForm,
      password: hashedPassword,
    });
    const { password: excludedPassword, ...userData } = newUser.toObject();
    res
      .status(200)
      .json({ message: "User created successfully!", user: userData });
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

export default signup;
