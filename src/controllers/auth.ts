import { Request, Response } from "express";
import User from "../models/user";
import { compareHash } from "../lib/encryption";
import { detokenize, tokenize } from "../lib/jwt";

export async function login(
  request: Request,
  response: Response
): Promise<void> {
  try {
    const { email, password } = request.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      response.status(404).json({
        success: false,
        message: `Unable to find user with email: ${email}`,
      });
      return;
    }

    const validatePassword = await compareHash(password, user.password);

    if (!validatePassword) {
      response
        .status(401)
        .json({ success: false, message: "Incorrect email or password." });
      return;
    }

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
      sameSite: "none", // or "none" if you're using HTTPS on both frontend/backend
      domain: ".alkhairqurbani.org", // ⬅️ Important for subdomain sharing
      path: "/",
    });

    response
      .status(200)
      .json({ success: true, data: { userId: user._id, role: user.role, token: accessToken } });
  } catch (err) {
    console.error(err);

    response.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : err,
      message: "Internal server error.",
    });
  }
}

export async function refresh(
  request: Request,
  response: Response
): Promise<void> {
  try {
    const cookies = request.cookies;

    if (!cookies.auth) {
      response.status(401).json({ success: false, message: "Unauthorized." });
    }

    const refreshToken = cookies.auth;

    const payload = await detokenize(refreshToken);

    const user = await User.findById(payload.userId);

    if (!user) {
      response.status(403).json({ success: false, message: "Unauthorized." });
      return;
    }

    const accessToken = tokenize(
      { userId: user._id.toString(), role: user.role },
      "15m"
    );

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

export async function logout(
  request: Request,
  response: Response
): Promise<void> {
  try {
    const cookies = request.cookies;

    if (!cookies.auth) {
      response.status(204).json({ success: false, message: "No content" });
      return;
    }

    response.clearCookie("auth", {
      httpOnly: true,
      sameSite: "none",
      domain: ".alkhairqurbani.org", // ⬅️ Important for subdomain sharing
      secure: true,
    });

    response.status(200).json({ success: true, message: "Logged out." });
  } catch (err) {
    console.error(err);

    response.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : err,
      message: "Internal server error.",
    });
  }
}
