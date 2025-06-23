import Hotel from "../models/Hotel.js";
import User from "../models/User.js";

export const registerHotel = async (req, res) => {
  try {
    // Safety check for req.user
    if (!req.user || !req.user._id) {
      return res.status(401).json({ success: false, message: "Unauthorized: User not found in request" });
    }

    const { name, address, contact, city } = req.body;
    const owner = req.user._id;

    // Validate required fields
    if (!name || !address || !contact || !city) {
      return res.status(400).json({ success: false, message: "All fields (name, address, contact, city) are required" });
    }

    // Check if user already registered a hotel
    const hotel = await Hotel.findOne({ owner });
    if (hotel) {
      return res.status(400).json({ success: false, message: "Hotel already registered by this user" });
    }

    // Create new hotel
    await Hotel.create({ name, address, contact, city, owner });

    // Update user role to hotelOwner
    await User.findByIdAndUpdate(owner, { role: "hotelOwner" }, { new: true });

    res.status(201).json({ success: true, message: "Hotel registered successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: `Server error: ${error.message}` });
  }
};
