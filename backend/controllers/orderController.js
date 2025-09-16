//Placing orders using COD Method
import { response } from "express";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
const placeOrder = async (req, res) => {
  try {
    const { amount, userId, items, address } = req.body;
    const orderData = {
      userId,
      items,
      amount,
      paymentMethod: "COD",
      payment: false,
      address,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true, message: "order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Placing orders using Stripe Method

const placeOrderStripe = async (req, res) => {};

//Placing orders using Esewa Method
const placeOrderEsewa = async (req, res) => {};

//All orders data for Admin Panel
const allOrders = async (req, res) => {};

//All orders data for Frontend
const userOrders = async (req, res) => {};

//Update order status from admin panel
const updateStatus = async (req, res) => {};

export {
  placeOrder,
  placeOrderEsewa,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
};
