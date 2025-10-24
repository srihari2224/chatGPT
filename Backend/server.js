import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.use("/api", chatRoutes);

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
    connectDB();
});

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected with Database!");
    } catch(err) {
        console.log("Failed to connect with Db", err);
    }
}

app.post("/test", async (req, res) => {
    try {
        const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = client.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

        const response = await model.generateContent(req.body.message);
        const text = response.response.text();
        
        res.send(text);
    } catch(err) {
        console.error("Error:", err);
        res.status(500).send("Error generating response");
    }
});