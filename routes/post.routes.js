import { Router } from "express";

const postRouter = Router();

postRouter.get("/", (req, res) => {
  res.send("List of posts");
});

postRouter.post("/", (req, res) => {
  res.send("Post created");
});

postRouter.get("/:id", (req, res) => {
  res.send(`Details of post with ID: ${req.params.id}`);
});

postRouter.put("/:id", (req, res) => {
  res.send(`Post with ID: ${req.params.id} updated`);
});

postRouter.delete("/:id", (req, res) => {
  res.send(`Post with ID: ${req.params.id} deleted`);
});

export default postRouter;
