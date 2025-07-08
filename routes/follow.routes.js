import { Router } from "express";
import authorize from "../middleware/auth.middleware.js";
import {
  getFollowers,
  getFollowing,
  toggleFollow,
} from "../controllers/follow.controller.js";

const followRouter = Router();

followRouter.post("/:userId", authorize, toggleFollow);

followRouter.get("/followers", authorize, getFollowers);

followRouter.get("/following", authorize, getFollowing);

export default followRouter;
