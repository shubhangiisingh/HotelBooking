import express from "express";
// import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from './configs/db.js'; 
import { clerkMiddleware } from '@clerk/express'
import clerkWebHooks from "./controllers/clerkWebHooks.js";
dotenv.config()
connectDB()
const app= express()
app.use(cors())
//Middleware
app.use(express.json());
app.use(clerkMiddleware())
//API to listen Clerk Webhooks
app.use("/api/clerk", clerkWebHooks)
app.get('/',(req,res)=> res.send("API is working "))
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));