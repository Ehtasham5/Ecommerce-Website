import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/user.route.js";

const app = express();

// App config
dotenv.config();
const port = process.env.PORT || 4000;
connectDB()
connectCloudinary() 

// Middlewares
app.use(express.json());
app.use(cors());

// APi end points
app.use("/api/user", userRouter)

app.listen(port, () => {
  console.log("Server is started on PORT: " + port);
});
