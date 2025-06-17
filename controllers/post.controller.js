import Post from "../models/post.model.js";

export const createPost = async (req, res, next) => {
  try {
    const post = await Post.create({
      ...req.body,
      userId: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    return next(error);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = "createdAt",
      order = "desc",
    } = req.query;

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build sort object
    const sortOrder = order === "asc" ? 1 : -1;
    const sortObj = { [sort]: sortOrder };

    // Get blogs with pagination
    const blogs = await Post.find({})
      .populate("userId", "name email profilePicture")
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit))
      .select("-__v");

    // Get total count for pagination info
    const totalPosts = await Post.countDocuments({});
    const totalPages = Math.ceil(totalPosts / parseInt(limit));
    const hasNextPage = parseInt(page) < totalPages;
    const hasPrevPage = parseInt(page) > 1;

    res.status(200).json({
      success: true,
      data: {
        blogs,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalPosts,
          hasNextPage,
          hasPrevPage,
          limit: parseInt(limit),
        },
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id)
      .populate("userId", "name email profilePicture")
      .select("-__v");

    if (!post) {
      const error = new Error("Post not found");
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    return next(error);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(
      {
        _id: req.params.id,
        userId: req.user._id,
      },
      req.body,
      { new: true, runValidators: true }
    );

    if (!post) {
      const error = new Error(
        "Post not found or you do not have permission to update it"
      );
      error.status = 404;
      throw error;
    }
    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: post,
    });
  } catch (error) {
    return next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!post) {
      const error = new Error(
        "Post not found or you do not have permission to delete it"
      );
      error.status = 404;
      throw error;
    }
    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    return next(error);
  }
};
