import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.route.js";
import orderRouter from "./routes/order.route.js";

const app = express();

const port = process.env.PORT || 4000;

// Database & Cloudinary
connectDB();
connectCloudinary();

// Middlewares
app.use(
  cors({
    origin: "https://forever-ecommerce-dnrj.vercel.app",
  })
);

app.use(express.json());

// API endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Health check
app.get("/", (req, res) => {
  res.send("API WORKING");
});

// Server
app.listen(port, () => {
  console.log(`Server is started on PORT: ${port}`);
});