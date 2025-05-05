import express from "express";
import authRoutes from "./routes/authRoutes.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { port, mongoUri } from "./config.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRoutes);

const PORT = port || 3005;

mongoose.connect(mongoUri).then(() => {
  console.log("✅  MongoDB connected");

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
