
import express from 'express';
import { getAuth } from '@clerk/express';
import upload from '../middleware/uploadMiddleware.js'; // Assuming you use multer for images
import Room from '../models/Rooms.js'; // Your room model

const router = express.Router();

router.post('/', upload.array('images'), async (req, res) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const { roomType, pricePerNight, amenities } = req.body;

    // Parse amenities string to array if needed
    const parsedAmenities = typeof amenities === 'string' ? JSON.parse(amenities) : amenities;

    const imageUrls = req.files.map(file => file.path); // Cloudinary will populate .path

    const newRoom = new Room({
      owner: userId,
      roomType,
      pricePerNight,
      amenities: parsedAmenities,
      images: imageUrls
    });

    await newRoom.save();

    res.status(201).json({
      success: true,
      message: 'Room created successfully',
      room: newRoom
    });

  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating room',
      error: error.message
    });
  }
});

export default router;


