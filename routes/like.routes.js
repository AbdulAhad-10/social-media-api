import { Router } from "express";
import { getPostLikes, toggleLike } from "../controllers/like.controller.js";
import authorize from "../middleware/auth.middleware.js";

const likeRouter = Router();

likeRouter.post("/:postId", authorize, toggleLike);
likeRouter.get("/:postId", getPostLikes);

export default likeRouter;
