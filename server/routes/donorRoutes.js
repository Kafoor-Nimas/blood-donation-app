import express from "express";
import {
  searchDonors,
  toggleDonorAvailability,
} from "../controllers/donorController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/search", searchDonors);
router.patch("/availability", protect, toggleDonorAvailability);

export default router;
