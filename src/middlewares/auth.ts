import { Request, Response, NextFunction } from "express";

const API_KEY = process.env.API_KEY || "";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers["x-api-key"] !== API_KEY) {
    res
      .status(403)
      .json({ success: false, message: "Forbidden: Invalid API key" });
    return;
  }
  next();
};

export default authMiddleware;
