import { Router } from "express";
import authorize from "../middleware/auth.middleware.js";

const commentRouter = Router();

commentRouter.post("/:postId", authorize, (req, res) =>
  res.send("Post Comment")
);

commentRouter.get("/:postId", (req, res) => res.send("Get Comments"));

export default commentRouter;
