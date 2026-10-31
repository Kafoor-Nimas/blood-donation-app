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
      enum: ["Normal", "Urgent", "Emergency"],
      default: "Normal",
    },
    contactPhone: { type: String, required: true },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Fulfilled"],
      default: "Open",
    },
  },
  { timestamps: true },
);

export default mongoose.model("BloodRequest", bloodRequestSchema);
