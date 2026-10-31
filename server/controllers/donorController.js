import User from "../models/User";

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
