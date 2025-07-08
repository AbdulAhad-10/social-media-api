import User from "../models/user.model.js";
import Follow from "../models/follow.model.js";

export const toggleFollow = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const followerId = req.user._id;

    if (followerId.toString() === userId) {
      const error = new Error("You cannot follow yourself");
      error.statusCode = 400;
      throw error;
    }

    const userToFollow = await User.findById(userId);
    if (!userToFollow) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    const existingFollow = await Follow.findOne({
      followerId,
      followingId: userId,
    });

    if (existingFollow) {
      await Follow.deleteOne({ _id: existingFollow._id });

      res.status(200).json({
        success: true,
        message: "User unfollowed successfully",
        data: {
          isFollowing: false,
          user: {
            _id: userToFollow._id,
            name: userToFollow.name,
            profilePicture: userToFollow.profilePicture,
          },
        },
      });
    } else {
      await Follow.create({
        followerId,
        followingId: userId,
      });

      res.status(201).json({
        success: true,
        message: "User followed successfully",
        data: {
          isFollowing: true,
          user: {
            _id: userToFollow._id,
            name: userToFollow.name,
            profilePicture: userToFollow.profilePicture,
          },
        },
      });
    }
  } catch (error) {
    return next(error);
  }
};

export const getFollowers = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const followers = await Follow.find({ followingId: userId })
      .populate("followerId", "name profilePicture bio")
      .sort({ createdAt: -1 });

    const followerUsers = followers.map((follow) => follow.followerId);

    res.status(200).json({
      success: true,
      message: "Followers retrieved successfully",
      data: followerUsers,
    });
  } catch (error) {
    return next(error);
  }
};

export const getFollowing = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const following = await Follow.find({ followerId: userId })
      .populate("followingId", "name profilePicture bio")
      .sort({ createdAt: -1 });

    const followingUsers = following.map((follow) => follow.followingId);

    res.status(200).json({
      success: true,
      message: "Following retrieved successfully",
      data: followingUsers,
    });
  } catch (error) {
    return next(error);
  }
};
