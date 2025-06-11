import express from "express";
import { PORT } from "./config/env.js";
import connectToDatabase from "./database/mongodb.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Welcome to the Social Media API!");
});

app.listen(PORT, async () => {
  console.log(`Social Media API is running on port http://localhost:${PORT}`);

  await connectToDatabase();
});
