import { Router } from "express";
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  updatePost,
} from "../controllers/post.controller.js";
import authorize from "../middleware/auth.middleware.js";

const postRouter = Router();

postRouter.get("/", getPosts);

postRouter.post("/", authorize, createPost);

postRouter.get("/:id", getPostById);

postRouter.put("/:id", authorize, updatePost);

postRouter.delete("/:id", authorize, deletePost);

export default postRouter;
