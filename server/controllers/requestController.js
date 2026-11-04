import BloodRequest from "../models/BloodRequest.js";
import User from "../models/User.js";
import { sendEmail } from "../utils/sendEmail.js";

export const createBloodRequest = async (req, res) => {
  try {
    const {
      patientName,
      bloodGroup,
      unitsNeeded,
      hospitalName,
      city,
      urgency,
      contactPhone,
    } = req.body;

    const newRequest = await BloodRequest.create({
      requester: req.user._id,
      patientName,
      bloodGroup,
      unitsNeeded,
      hospitalName,
      city,
      urgency,
      contactPhone,
    });

    const matchingDonors = await User.find({
      bloodGroup,
      city: new RegExp(city, "i"),
      isAvailable: true,
      role: "Donor",
    });

    matchingDonors.forEach((donor) => {
      sendEmail(
        donor.email,
        `EMERGENCY: ${bloodGroup} Blood Needed in ${city}`,
        `Hello ${donor.name}, \n\nAn urgent blood request has been posted for ${patientName} at ${hospitalName}, ${city}.\nUnits Needed: ${unitsNeeded}\nContact: ${contactPhone}\n\nPlease reach out if you can donate!`,
      );
    });

    res.status(200).json({
      success: true,
      message: "Request created",
      newRequest,
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

export const getBloodRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find()
      .populate("requester", "name email phone")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      requests,
    });
  } catch (error) {
    console.error("Get Blood Requests Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    let { status } = req.body;

    const requestItem = await BloodRequest.findById(id);

    if (!requestItem) {
      return res.status(404).json({
        success: false,
        message: "Blood request not found",
      });
    }

    if (status) {
      if (status.toLowerCase() === "open") status = "Open";
      if (status.toLowerCase() === "pending") status = "Pending";
      if (status.toLowerCase() === "under coordination")
        status = "Under Coordination";
      if (status.toLowerCase() === "fulfilled") status = "Fulfilled";
      if (status.toLowerCase() === "cancelled") status = "Cancelled";

      requestItem.status = status;
    }

    await requestItem.save();

    return res.status(200).json({
      success: true,
      message: "Request status updated successfully",
      request: requestItem,
    });
  } catch (error) {
    console.error("Error updating request status:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
