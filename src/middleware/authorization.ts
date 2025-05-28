import { Request, Response, NextFunction, RequestHandler } from "express";
import { detokenize } from "../lib/jwt";

export default function authorization(roles: string[]): RequestHandler {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const token = req.cookies.auth;

    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const { role } = await detokenize(token);

      if (!roles.includes(role)) {
        res.status(403).json({ message: "Forbidden" });
        return;
      }

      next();
    } catch (error) {
      console.error("Authorization error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
}
