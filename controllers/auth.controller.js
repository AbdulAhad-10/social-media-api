import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      name,
      email,
      password,
      profilePicture,
      coverPhoto,
      bio,
      isPrivate,
    } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const newUsers = await User.create(
      [
        {
          name,
          email,
          password: hashedPassword,
          profilePicture,
          coverPhoto,
          bio,
          isPrivate,
        },
      ],
      { session }
    );

    const newUser = newUsers[0];

    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        token,
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          profilePicture: newUser.profilePicture,
          coverPhoto: newUser.coverPhoto,
          bio: newUser.bio,
          isPrivate: newUser.isPrivate,
        },
      },
    });
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    return next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    // check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const error = new Error("Invalid password");
      error.statusCode = 401;
      throw error;
    }

    // generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.status(200).json({
      success: true,
      message: "User signed in successfully",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        token,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: "User signed out successfully",
      data: null,
    });
  } catch (error) {
    return next(error);
  }
};
