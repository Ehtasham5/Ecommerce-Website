import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.route.js";
import orderRouter from "./routes/order.route.js";

const app = express();

app.use(
  cors({
    origin: "https://ecommerce-frontend-flame-ten.vercel.app",
  })
);

// App config
dotenv.config();
const port = process.env.PORT || 4000;
connectDB()
connectCloudinary() 

// Middlewares
app.use(express.json());



// APi end points
app.use("/api/user", userRouter)
app.use("/api/product", productRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

app.get("/" , (req, res) => {
  res.send("API WORKING")
})

// Server
app.listen(port, () => {
  console.log("Server is started on PORT: " + port);
});
