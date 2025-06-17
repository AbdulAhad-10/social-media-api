import { Router } from "express";

const userRouter = Router();

userRouter.get("/me", (req, res) => {
  res.send("User Profile Details");
});

userRouter.put("/me", (req, res) => {
  res.send("User Profile Updated");
});

userRouter.get("/me/posts", (req, res) => {
  res.send("List of User Posts");
});

export default userRouter;
