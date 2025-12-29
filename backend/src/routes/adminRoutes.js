import express from "express";
import { getUsers, updateStatus } from "../controllers/adminController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/users", authMiddleware, adminMiddleware, getUsers);
router.patch("/users/:id/status", authMiddleware, adminMiddleware, updateStatus);

export default router;
