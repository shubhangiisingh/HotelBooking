import express from "express";
// import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from './configs/db.js'; 
import { clerkMiddleware } from '@clerk/express'
import clerkWebHooks from "./controllers/clerkWebHooks.js";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
dotenv.config()
connectDB()
connectCloudinary();
const app= express()
app.use(cors())
//Middleware
app.use(express.json());
app.use(clerkMiddleware())
//API to listen Clerk Webhooks
app.use("/api/clerk", clerkWebHooks)
app.get('/',(req,res)=> res.send("API is working "))
app.use('/api/user', userRouter)
app.use('/api/hotels', hotelRouter)
app.use('/api/rooms', roomRouter)
app.use('/api/bookings', bookingRouter)
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));