import Post from "../models/Post.js";
import Like from "../models/Like.js";
import mongoose from "mongoose";

export const toggleLike = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { postId } = req.params;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    if (!post) {
      const error = new Error("Post not found");
      error.statusCode = 404;
      throw error;
    }

    const existingLike = await Like.findOne({ userId, postId });

    if (existingLike) {
      await Like.findByIdAndDelete(existingLike._id, { session });
      await Post.findByIdAndUpdate(
        postId,
        { $inc: { likesCount: -1 } },
        { session }
      );

      await session.commitTransaction();
      session.endSession();

      return res.status(200).json({
        success: true,
        message: "Post unliked successfully",
        data: {
          action: "unliked",
          postId: postId,
          userId: userId,
          likesCount: post.likesCount - 1,
        },
      });
    } else {
      const newLikes = await Like.create([{ userId, postId }], { session });
      const newLike = newLikes[0];

      await Post.findByIdAndUpdate(
        postId,
        { $inc: { likesCount: 1 } },
        { session }
      );

      await session.commitTransaction();
      session.endSession();

      return res.status(201).json({
        success: true,
        message: "Post liked successfully",
        data: {
          action: "liked",
          likeId: newLike._id,
          postId: postId,
          userId: userId,
          likedAt: newLike.createdAt,
          likesCount: post.likesCount + 1,
        },
      });
    }
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return next(error);
  }
};

export const getPostLikes = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { page = 1, limit = 20 } = req.query;

    const post = await Post.findById(postId);
    if (!post) {
      const error = new Error("Post not found");
      error.statusCode = 404;
      throw error;
    }

    const likes = await Like.find({ postId })
      .populate("userId", "name profilePicture")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Like.countDocuments({ postId });

    res.status(200).json({
      success: true,
      data: {
        likes: likes.map((like) => ({
          id: like._id,
          user: like.userId,
          likedAt: like.createdAt,
        })),
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    return next(error);
  }
};
