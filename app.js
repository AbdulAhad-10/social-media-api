// import express from "express";
// import { PORT } from "./config/env.js";
// import connectToDatabase from "./database/mongodb.js";
// import authRouter from "./routes/auth.routes.js";
// import cookieParser from "cookie-parser";
// import errorMiddleware from "./middleware/error.middleware.js";
// import uploadRouter from "./routes/upload.routes.js";
// import postRouter from "./routes/post.routes.js";
// import userRouter from "./routes/user.routes.js";
// import likeRouter from "./routes/like.routes.js";
// import commentRouter from "./routes/comment.routes.js";
// import shareRouter from "./routes/share.routes.js";
// import followRouter from "./routes/follow.routes.js";
// import arcjetMiddleware from "./middleware/arcjet.middleware.js";

// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(arcjetMiddleware);

// app.use("/api/v1/auth", authRouter);
// app.use("/api/v1/upload", uploadRouter);
// app.use("/api/v1/posts", postRouter);
// app.use("/api/v1/users", userRouter);
// app.use("/api/v1/likes", likeRouter);
// app.use("/api/v1/comments", commentRouter);
// app.use("/api/v1/shares", shareRouter);
// app.use("/api/v1/follows", followRouter);

// app.use(errorMiddleware);

// app.get("/", (req, res) => {
//   res.send("Welcome to the Social Media API!");
// });

// app.listen(PORT, async () => {
//   console.log(`Social Media API is running on port http://localhost:${PORT}`);

//   await connectToDatabase();
// });


import express from "express";
import connectToDatabase from "./database/mongodb.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/error.middleware.js";
import uploadRouter from "./routes/upload.routes.js";
import postRouter from "./routes/post.routes.js";
import userRouter from "./routes/user.routes.js";
import likeRouter from "./routes/like.routes.js";
import commentRouter from "./routes/comment.routes.js";
import shareRouter from "./routes/share.routes.js";
import followRouter from "./routes/follow.routes.js";
import arcjetMiddleware from "./middleware/arcjet.middleware.js";

const app = express();

await connectToDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetMiddleware);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/upload", uploadRouter); 
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/likes", likeRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/shares", shareRouter);
app.use("/api/v1/follows", followRouter);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Welcome to the Social Media API!");
});

export default app;