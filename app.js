import express from "express";
import { PORT } from "./config/env.js";
import connectToDatabase from "./database/mongodb.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/error.middleware.js";
import uploadRouter from "./routes/upload.routes.js";
import postRouter from "./routes/post.routes.js";
import userRouter from "./routes/user.routes.js";
import likeRouter from "./routes/like.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1//upload", uploadRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/likes", likeRouter);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Welcome to the Social Media API!");
});

app.listen(PORT, async () => {
  console.log(`Social Media API is running on port http://localhost:${PORT}`);

  await connectToDatabase();
});
