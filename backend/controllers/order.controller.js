import orderModel from "../models/order.model.js";
import userModel from "../models/user.model.js";

const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address, paymentMethod = "cod" } = req.body;

    const order = await orderModel.create({
      userId,
      items, 
      amount,
      address,
      paymentMethod,
      payment: paymentMethod !== "cod",
    });
    
    await userModel.findByIdAndUpdate(userId, {cartData: {}})

    return res.json({ success: true, message: "Order placed", order });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId }).sort({ createdAt: -1 });

    return res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}).sort({ createdAt: -1 });

    return res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(orderId, { status }, { runValidators: true });

    return res.json({ success: true, message: "Order status updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { placeOrder, userOrders, allOrders, updateStatus };