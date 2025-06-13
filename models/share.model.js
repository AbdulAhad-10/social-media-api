import mongoose from "mongoose";

const shareSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "Post ID is required"],
    },
    sharedContent: {
      type: String,
      trim: true,
      maxLength: 500,
    },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: false } }
);

shareSchema.index({ postId: 1, createdAt: -1 });
shareSchema.index({ userId: 1, createdAt: -1 });

const Share = mongoose.model("Share", shareSchema);
export default Share;
