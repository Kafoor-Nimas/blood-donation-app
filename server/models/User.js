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
    district: { type: String, required: true },
    city: { type: String },
    phone: { type: String, required: true },
    isAvailable: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true }, 
    lastDonatedAt: { type: Date },

    preferredCenters: { type: String },
    facility: { type: String },
    hemoglobin: { type: String, default: "13.8 g/dL (Normal)" },
    donationsCount: { type: Number, default: 0 },
    verificationId: { type: String },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// 1. Auto-generate verification ID before saving if not present
userSchema.pre("save", function () {
  if (!this.verificationId) {
    this.verificationId = `SL-${Math.floor(1000 + Math.random() * 9000)}`;
  }
  if (!this.city) {
    this.city = this.district;
  }
});

// 2. Computed Virtual Properties for UI Compatibility

// Group alias ('O+')
userSchema.virtual("group").get(function () {
  return this.bloodGroup;
});

// Rh Factor ('Rh Pos' vs 'Rh Neg')
userSchema.virtual("rhType").get(function () {
  return this.bloodGroup?.includes("-") ? "Rh Neg" : "Rh Pos";
});

// Available alias (boolean)
userSchema.virtual("available").get(function () {
  return this.isAvailable;
});

// Status string
userSchema.virtual("status").get(function () {
  return this.isAvailable ? "Ready to Donate" : "In Clinical Rest";
});

// Location string ("Colombo • Dehiwala")
userSchema.virtual("location").get(function () {
  return `${this.district}${this.city ? " • " + this.city : ""}`;
});

// Badge based on total donation count
userSchema.virtual("badge").get(function () {
  if (this.donationsCount >= 10) return "10x Platinum Donor";
  if (this.donationsCount >= 5) return "5x Gold Donor";
  if (this.donationsCount >= 1) return "Bronze Donor";
  return "New Registered Donor";
});

// Formatted Last Donated String
userSchema.virtual("lastDonated").get(function () {
  if (!this.lastDonatedAt) return "First Time / Ready";

  const diffMonths = Math.floor(
    (new Date() - new Date(this.lastDonatedAt)) / (1000 * 60 * 60 * 24 * 30),
  );

  if (diffMonths < 1) return "Less than a month ago";
  return `${diffMonths} Month${diffMonths > 1 ? "s" : ""} Ago`;
});

export default mongoose.model("User", userSchema);
