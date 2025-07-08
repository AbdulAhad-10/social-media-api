import Post from "../models/post.model.js";
import Share from "../models/share.model.js";

export const sharePost = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) {
      const error = new Error("Post not found");
      error.statusCode = 404;
      throw error;
    }

    const share = await Share.create({
      ...req.body,
      userId: req.user._id,
      postId,
    });

    await Post.findByIdAndUpdate(postId, { $inc: { sharesCount: 1 } });

    res.status(201).json({
      success: true,
      message: "Post shared successfully",
      data: share,
    });
  } catch (error) {
    return next(error);
  }
};

export const getShares = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) {
      const error = new Error("Post not found");
      error.statusCode = 404;
      throw error;
    }

    const shares = await Share.find({ postId })
      .populate("userId", "name profilePicture")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: shares,
    });
  } catch (error) {
    return next(error);
  }
};
