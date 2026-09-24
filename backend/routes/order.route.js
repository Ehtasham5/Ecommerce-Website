import express from "express";
import {
  allOrders,
  placeOrder,
  updateStatus,
  userOrders,
} from "../controllers/order.controller.js";
import adminAuth from "../middleware/adminAuth.middleware.js";
import authUser from "../middleware/auth.middleware.js";

const orderRouter = express.Router();

orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/userorders", authUser, userOrders);
orderRouter.get("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

export default orderRouter;
