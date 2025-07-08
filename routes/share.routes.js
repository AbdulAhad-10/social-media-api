import { Router } from "express";
import authorize from "../middleware/auth.middleware.js";
import { getShares, sharePost } from "../controllers/share.controller.js";

const shareRouter = Router();

shareRouter.post("/:postId", authorize, sharePost);

shareRouter.get("/:postId", getShares);

export default shareRouter;
