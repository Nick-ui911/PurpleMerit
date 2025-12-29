import express from "express";
import { changePassword, getProfile, updateProfile } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";


const router = express.Router();

router.get("/profile", authMiddleware, getProfile);
router.patch("/profile-update", authMiddleware, updateProfile);
router.patch("/change-password", authMiddleware, changePassword);

export default router;
