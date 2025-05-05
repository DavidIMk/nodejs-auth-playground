import jwt from "jsonwebtoken";
import { jwtExpiresIn, jwtSecret } from "../config.js";

export function signAccessToken(userId) {
  return jwt.sign({ userId }, jwtSecret, {
    expiresIn: jwtExpiresIn,
  });
}

export function verifyAccessToken(token) {
  return jwt.verify(token, jwtSecret);
}
