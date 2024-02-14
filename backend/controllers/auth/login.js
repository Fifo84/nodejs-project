import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { loginValid } from "../../utils/validation/users.validation/loginValidation.js";
import { User } from "../users/schemas/user.model.js";
import { dotenvVariables } from "../../config/dotenvService.js";

const { JWT_SECRET } = dotenvVariables;

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const loginValidate = loginValid.validate(req.body, { abortEarly: false });

    if (loginValidate.error) {
      const loginErrors = loginValidate.error.details.map((err) => err.message);
      const error = new Error(loginErrors);
      error.statusCode = 400;
      error.errorsArray = loginErrors;
      next(error);
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("Email not found");
      error.statusCode = 404;
      return next(error);
    }

    if (user.lockReleaseDate && user.lockReleaseDate > Date.now()) {
      const error = new Error(
        "After three unsuccessful login attempts, we've locked your account for security reasons. Please reach out to the administrator or wait for 24 hours before trying again."
      );
      error.statusCode = 429;
      return next(error);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      user.loginAttempts += 1;
      if (user.loginAttempts >= 3) {
        user.lockReleaseDate = Date.now() + 24 * 60 * 60 * 1000;
        user.loginAttempts = 0;
      }
      await user.save();
      const error = new Error("  email or password are incorrect");
      error.statusCode = 401;
      return next(error);
    }
    user.loginAttempts = 0;
    user.lockReleaseDate = undefined;
    await user.save();
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.email;

    const token = jwt.sign(
      { userId: user._id, isBusiness: user.isBusiness, isAdmin: user.isAdmin },
      JWT_SECRET,
      {
        expiresIn: "1hr",
      }
    );
    res.status(200).send(token);
  } catch (error) {
    next(error);
  }
};

export default login;
