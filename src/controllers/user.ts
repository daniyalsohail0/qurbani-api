import { Request, Response } from "express";
import User from "../models/user";
import { hashPassword } from "../lib/encryption";
import { detokenize, tokenize } from "../lib/jwt";

export async function registerUser(
  request: Request,
  response: Response
): Promise<void> {
  try {
    const { name, email, password, country, region } = request.body;

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      response.status(400).json({
        success: false,
        message: "User with this email already exists.",
      });
    }

    const hashedPassword = await hashPassword(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      country,
      region,
      role: "user",
    });

    const accessToken = await tokenize(
      { userId: user._id.toString(), role: user.role },
      "15m"
    );

    const refreshToken = await tokenize(
      { userId: user._id.toString(), role: user.role },
      "7d"
    );

    response.cookie("auth", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    response.status(200).json({ success: true, data: { token: accessToken } });
  } catch (err) {
    console.error(err);

    response.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : err,
      message: "Internal server error.",
    });
  }
}

export async function readUsers(
  request: Request,
  response: Response
): Promise<void> {
  try {
    const token = request.cookies?.auth;

    const payload = await detokenize(token);

    if (payload.role !== "admin") {
      response
        .status(403)
        .json({ success: false, message: "Unauthorized action." });

      return;
    }

    const users = await User.find().select(["-password"]);

    response.status(200).json({ success: true, data: users });
  } catch (err) {
    console.error(err);

    response.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : err,
      message: "Internal server error.",
    });
  }
}

export async function readUser(
  request: Request,
  response: Response
): Promise<void> {
  try {
    const { id } = request.params;
    const token = request.cookies?.auth;

    if (!token) {
      response
        .status(401)
        .json({ success: false, message: "Unauthorized: No token found." });
      return;
    }

    const { userId } = await detokenize(token);

    if (!userId || userId !== id) {
      response
        .status(401)
        .json({ success: false, message: "Unauthorized: No userId found." });
      return;
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      response
        .status(404)
        .json({ success: false, message: "Unable to find user." });
    }

    response.status(200).json({ success: true, data: user });
  } catch (err) {
    console.error(err);

    response.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : err,
      message: "Internal server error.",
    });
  }
}

export async function updateUser(
  request: Request,
  response: Response
): Promise<void> {
  try {
    const { id } = request.params;
    const token = request.cookies?.auth;
    const data = request.body;

    if (!token) {
      response
        .status(401)
        .json({ success: false, message: "Unauthorized: No token found." });
      return;
    }

    const { userId } = await detokenize(token);

    if (!userId || userId !== id) {
      response
        .status(401)
        .json({ success: false, message: "Unauthorized: No userId found." });
      return;
    }

    const user = await User.findByIdAndUpdate(userId, data, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) {
      response
        .status(404)
        .json({ success: false, message: "Unable to find user." });
    }

    response.status(200).json({ success: true, data: user });
  } catch (err) {
    console.error(err);

    response.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : err,
      message: "Internal server error.",
    });
  }
}

export async function deleteUser(
  request: Request,
  response: Response
): Promise<void> {
  try {
    const { id } = request.params;
    const token = request.cookies?.auth;

    if (!token) {
      response
        .status(401)
        .json({ success: false, message: "Unauthorized: No token found." });
      return;
    }

    const { userId } = await detokenize(token);

    if (!userId || userId !== id) {
      response
        .status(401)
        .json({ success: false, message: "Unauthorized: No userId found." });
      return;
    }

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      response
        .status(404)
        .json({ success: false, message: "Unable to find user." });
    }

    response.status(200).json({ success: true, data: user });
  } catch (err) {
    console.error(err);

    response.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : err,
      message: "Internal server error.",
    });
  }
}
