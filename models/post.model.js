import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    content: {
      type: String,
      required: [true, "Post content is required"],
      trim: true,
      maxLength: 2000,
    },
    mediaUrls: [String],
    likesCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    commentsCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    sharesCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    location: String,
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

postSchema.index({ userId: 1, createdAt: -1 });
postSchema.index({ isPublic: 1, createdAt: -1 });

const Post = mongoose.model("Post", postSchema);
export default Post;
