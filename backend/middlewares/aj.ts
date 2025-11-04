import { Request, Response, NextFunction } from "express";
import aj from "../lib/arcjet";
import { isSpoofedBot, isMissingUserAgent } from "@arcjet/inspect";

export const ajMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const decision = await aj.protect(req, { requested: 1 });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ message: "Too many requests!" });
      } else if (decision.reason.isBot()) {
        return res.status(403).json({ message: "Bot access denied!" });
      } else {
        return res.status(403).json({ message: "Request denied!" });
      }
    }

    if (decision.results.some(isMissingUserAgent)) {
      return res.status(403).json({ message: "Missing user agent!" });
    }

    if (decision.results.some(isSpoofedBot)) {
      return res.status(403).json({ message: "Spoofed bot detected!" });
    }

    next();
  } catch (error) {
    console.error("Arcjet error:", error);
    next(error);
  }
};
