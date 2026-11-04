import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, bloodGroup, district, phone, city } =
      req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }

    const userRole = role || "Donor";

    if (userRole === "Donor" && (!bloodGroup || !phone)) {
      return res.status(400).json({
        success: false,
        message: "Blood group and phone number are required for Donors",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const validBloodGroup =
      bloodGroup &&
      ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].includes(bloodGroup)
        ? bloodGroup
        : "O+";

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: userRole,
      bloodGroup: validBloodGroup,
      district: district || "Colombo",
      city: city || district || "Colombo",
      phone: phone || "N/A", 
      isAvailable: true,
    });

    const jwtSecret =
      process.env.JWT_SECRET || "lifelink_fallback_jwt_secret_key_2026";

    const token = jwt.sign({ id: user._id }, jwtSecret, {
      expiresIn: "7d",
    });

    const userObj = user.toJSON();
    delete userObj.password;

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: userObj,
      token,
    });
  } catch (error) {
    console.error("Register Error Details:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error during registration",
      error: error.name === "ValidationError" ? error.errors : error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const jwtSecret =
      process.env.JWT_SECRET || "lifelink_fallback_jwt_secret_key_2026";

    const token = jwt.sign({ id: user._id }, jwtSecret, {
      expiresIn: "7d",
    });

    const userObj = user.toJSON();
    delete userObj.password;

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      user: userObj,
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during login",
      error: error.message,
    });
  }
};

export const getMe = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    console.error("Error in getMe controller:", error);
    res.status(500).json({
      success: false,
      message: "Server error during user retrieval",
      error: error.message,
    });
  }
};