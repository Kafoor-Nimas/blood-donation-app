import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createBloodRequest,
  getBloodRequests,
} from "../controllers/requestController.js";

const router = express.Router();

router.post("/", protect, createBloodRequest);
router.get("/", getBloodRequests);

export default router;
