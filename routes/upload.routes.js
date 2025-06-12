import { Router } from "express";
import { uploadImage } from "../controllers/upload.controller.js";
import upload from "../middleware/upload.middleware.js";

const uploadRouter = Router();

// POST /api/upload/image
uploadRouter.post("/image", upload.single("image"), uploadImage);

export default uploadRouter;
