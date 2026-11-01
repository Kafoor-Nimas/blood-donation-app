import express from "express";
import { adminOnly, protect } from "../middleware/authMiddleware.js";
import { getAdminStats, verifyDonor } from "../controllers/adminController.js";

const router = express.Router();

router.get("/", protect, adminOnly, getAdminStats);
router.patch("/verify/:id", protect, adminOnly, verifyDonor);

export default router;
