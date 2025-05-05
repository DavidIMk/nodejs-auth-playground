import { Router } from "express";
import { basicAuth } from "../middleware/basicAuth.js";

const router = new Router();
router.get("/secret", basicAuth, (req, res) => {
  res.json({ message: `Hello user ${req.userId}!` });
});

export default router;
