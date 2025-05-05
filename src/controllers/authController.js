import User from "../models/User.js";
import bcrypt from "bcrypt";
import { signAccessToken } from "../services/tokenService.js";

export async function register(req, res) {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      username,
      password: hashedPassword,
    });
    res.status(201).json({ message: "User Registered Successfully " });
  } catch {
    res.status(500).json({ error: "Registration Failed" });
  }
}

export async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      username,
    });
    if (!user) {
      res.status(401).json({ error: "User Not Found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({ error: "Authentication Failed" });
    }
    const token = signAccessToken(user.id);
    res
      .cookie("refreshToken", user.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      })
      .status(200)
      .json({ token });
  } catch {
    res.status(500).json({ error: "Login Failed" });
  }
}
