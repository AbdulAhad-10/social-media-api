import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "Post ID is required"],
    },
    fileUrl: {
      type: String,
      required: [true, "File URL is required"],
    },
    fileType: {
      type: String,
      enum: ["image", "video"],
      required: [true, "File type is required"],
    },
    fileSize: Number,
    duration: Number,
    altText: String,
    uploadStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: false } }
);

mediaSchema.index({ postId: 1 });

const Media = mongoose.model("Media", mediaSchema);
export default Media;
