import express from "express";
import { adminOnly, protect } from "../middleware/authMiddleware";
import { getAdminStats, verifyDonor } from "../controllers/adminController";

const router = express.Router();

router.get("/", protect, adminOnly, getAdminStats);
router.patch("/verify/:id", protect, adminOnly, verifyDonor);

export default router;
