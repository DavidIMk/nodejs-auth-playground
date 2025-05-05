import jwt from "jsonwebtoken";
import { jwtSecret } from "../config.js";

export const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ error: "Access Denied" });
  }

  const [scheme, token] = authHeader.split(" ");
  if (scheme !== "Bearer" || !token) {
    return res.status(400).json({ error: "Access Denied" });
  }

  try {
    const payload = jwt.verify(token, jwtSecret);
    req.userId = payload.userId;
  } catch {
    res.status(401).json({ error: "Invalid Token" });
  }
};
