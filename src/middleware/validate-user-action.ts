import { NextFunction, Request, RequestHandler, Response } from "express";
import { detokenize } from "../lib/jwt";

export default function validateUserAction(): RequestHandler {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const token = req.cookies.auth;

    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    try {
      const info = await detokenize(token);

      console.log(info);

      next();
    } catch (error) {
      console.error("Validation error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
}
