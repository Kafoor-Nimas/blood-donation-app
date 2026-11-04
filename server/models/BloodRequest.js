import mongoose from "mongoose";

const bloodRequestSchema = new mongoose.Schema(
  {
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    patientName: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      required: true,
    },
    unitsNeeded: { type: Number, required: true, default: 1 },
    hospitalName: { type: String, required: true },
    city: { type: String, required: true },
    urgency: {
      type: String,
      enum: [
        "low",
        "medium",
        "high",
        "critical",
        "urgent",
        "standard",
        "normal",
      ],
      default: "critical",
    },
    contactPhone: { type: String, default: "N/A" },
    status: {
      type: String,
      enum: ["Pending", "Open", "Under Coordination", "Fulfilled", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true },
);

export default mongoose.model("BloodRequest", bloodRequestSchema);
