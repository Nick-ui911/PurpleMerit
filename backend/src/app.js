import express from "express";
import cors from "cors";

import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(express.json());app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,              
  })
);
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);

export default app;
