import User from "../models/User.js";

export const searchDonors = async (req, res) => {
  try {
    const { bloodGroup, city } = req.query;

    let query = { role: "Donor", isAvailable: true };

    if (bloodGroup) query.bloodGroup = bloodGroup;
    if (city) query.city = new RegExp(city, "i");

    const donors = await User.find(query).select("-password");
    res.json(donors);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const toggleDonorAvailability = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.isAvailable = !user.isAvailable;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Status updated",
      isAvailable: user.isAvailable,
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
