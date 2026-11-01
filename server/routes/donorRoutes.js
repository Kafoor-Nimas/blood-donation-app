import express from "express";
import {
  searchDonors,
  toggleDonorAvailability,
} from "../controllers/donorController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/search", searchDonors);
router.patch("/availability", protect, toggleDonorAvailability);

export default router;
