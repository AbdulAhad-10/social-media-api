import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export const getUserDetails = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password -__v");
    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return next(error);
  }
};

export const updateUserDetails = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      {
        _id: req.user._id,
      },
      req.body,
      { new: true, runValidators: true }
    ).select("-password -__v");
    if (!user) {
      const error = new Error(
        "User not found or you do not have permission to update it"
      );
      error.status = 404;
      throw error;
    }
    res.status(200).json({
      success: true,
      message: "User details updated successfully",
      data: user,
    });
  } catch (error) {
    return next(error);
  }
};

export const getUserPosts = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password -__v");
    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }

    const posts = await Post.find({ userId: req.user._id }).select("-__v");

    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    return next(error);
  }
};
