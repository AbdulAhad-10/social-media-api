import { Router } from "express";
import authorize from "../middleware/auth.middleware.js";
import { getComments, postComment } from "../controllers/comment.controller.js";

const commentRouter = Router();

commentRouter.post("/:postId", authorize, postComment);

commentRouter.get("/:postId", getComments);

export default commentRouter;
