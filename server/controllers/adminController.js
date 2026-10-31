import BloodRequest from "../models/BloodRequest";
import User from "../models/User";

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
