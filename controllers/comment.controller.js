import mongoose from "mongoose";
import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";

export const postComment = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { postId } = req.params;

    const post = await Post.findById(postId).session(session);
    if (!post) {
      const error = new Error("Post not found");
      error.statusCode = 404;
      throw error;
    }

    const comment = await Comment.create(
      [
        {
          ...req.body,
          userId: req.user._id,
          postId,
        },
      ],
      { session }
    );

    await Post.findByIdAndUpdate(
      postId,
      { $inc: { commentsCount: 1 } },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "Comment posted successfully",
      data: comment[0],
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return next(error);
  }
};

export const getComments = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) {
      const error = new Error("Post not found");
      error.statusCode = 404;
      throw error;
    }

    const comments = await Comment.find({ postId })
      .populate("userId", "name profilePicture")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: comments,
    });
  } catch (error) {
    return next(error);
  }
};
