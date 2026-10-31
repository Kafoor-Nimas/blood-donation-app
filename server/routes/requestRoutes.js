import express from "express";
import { protect } from "../middleware/authMiddleware";
import {
  createBloodRequest,
  getBloodRequests,
} from "../controllers/requestController";

const router = express.Router();

router.post("/", protect, createBloodRequest);
router.get("/", getBloodRequests);

export default router;
