import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["Donor", "Requester", "Admin"],
      default: "Donor",
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      required: true,
    },
    city: { type: String, required: true },
    phone: { type: String, required: true },
    isAvailable: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },
    lastDonatedAt: { type: Date },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
