import { Router } from "express";
import authorize from "../middleware/auth.middleware.js";
import {
  getAllUsers,
  getUserDetails,
  getUserPosts,
  updateUserDetails,
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);

userRouter.get("/me", authorize, getUserDetails);

userRouter.put("/me", authorize, updateUserDetails);

userRouter.get("/me/posts", authorize, getUserPosts);

export default userRouter;
