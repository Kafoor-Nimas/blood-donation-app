import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createBloodRequest,
  getBloodRequests,
  updateRequestStatus,
} from "../controllers/requestController.js";

const router = express.Router();

router.post("/", protect, createBloodRequest);
router.get("/", getBloodRequests);
router.patch("/:id/status", protect, updateRequestStatus); 

export default router;
