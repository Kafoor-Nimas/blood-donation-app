import BloodRequest from "../models/BloodRequest.js";
import User from "../models/User.js";

export const getAdminStats = async (req, res) => {
  try {
    const totalDonors = await User.countDocuments({ role: "Donor" });
    const verifiedDonors = await User.countDocuments({
      role: "Donor",
      isVerified: true,
    });
    const openRequests = await BloodRequest.countDocuments({ status: "Open" });
    const fulfilledRequests = await BloodRequest.countDocuments({
      status: "Fulfilled",
    });

    const donorsList = await User.find({ role: "Donor" }).select("-password");

    res.status(200).json({
      success: true,
      stats: { totalDonors, verifiedDonors, openRequests, fulfilledRequests },
      donorsList,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const verifyDonor = async (req, res) => {
  try {
    const donor = await User.findById(req.params.id);
    if (!donor) {
      return res.status(404).json({
        success: false,
        message: "Donor not found",
      });
    }

    donor.isVerified = true;
    await donor.save();
    res.status(200).json({
      success: true,
      message: "Donor verified successfully",
      donor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


export const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.isActive = user.isActive === undefined ? false : !user.isActive;
    await user.save();

    res.status(200).json({
      success: true,
      message: `User status changed to ${user.isActive ? "Active" : "Suspended"}`,
      donor: user,
    });
  } catch (error) {
    console.error("Error toggling user status:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};