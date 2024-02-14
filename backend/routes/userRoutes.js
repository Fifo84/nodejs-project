import express from "express";
import signup from "../controllers/auth/signup.js";
import login from "../controllers/auth/login.js";
import getAllUsers from "../controllers/users/usersHandlers/getAllUsers.js";
import getOneUser from "../controllers/users/usersHandlers/getOneUser.js";
import editUser from "../controllers/users/usersHandlers/editUser.js";
import editIsBusiness from "../controllers/users/usersHandlers/editIsBusiness.js";
import deleteUser from "../controllers/users/usersHandlers/deleteUser.js";
import { guard } from "../middleware/guard.js";

const userRouter = express.Router();

userRouter.post("/", signup);
userRouter.post("/login", login);
userRouter.get("/", guard, getAllUsers);
userRouter.get("/:id", guard, getOneUser);
userRouter.put("/:id", guard, editUser);
userRouter.patch("/:id", guard, editIsBusiness);
userRouter.delete("/:id", guard, deleteUser);

export default userRouter;
