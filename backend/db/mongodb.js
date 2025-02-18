import fastify from "fastify";
import mongoose from "mongoose";
export const dbconnect=()=>{ mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB", err);
});}