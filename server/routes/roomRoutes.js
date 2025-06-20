
import express from 'express';
import { getAuth } from '@clerk/express';
import upload from '../middleware/uploadMiddleware.js'; // Assuming you use multer for images
import Room from '../models/Rooms.js'; // Your room model
import { protect } from '../middleware/authMiddleware.js';
import { createRoom , getOwnerRooms, getRooms, toggleRoomAvalibility} from '../controllers/roomController.js';

const roomRouter = express.Router();

roomRouter.post('/', upload.array('images',4),protect, createRoom) 
roomRouter.get('/', getRooms)
roomRouter.get('/owner',protect, getOwnerRooms)
roomRouter.post('/toggle-availability',protect, toggleRoomAvalibility)
export default roomRouter;


