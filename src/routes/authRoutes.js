import { Router } from "express";
import { login, register } from "../controllers/authController.js";
import { verifyToken } from '../middleware/auth.js';

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", verifyToken, (req, res) => {
  res.json({ message: `Hello User ${req.userId}` });
});

export default router;
