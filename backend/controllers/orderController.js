import { response } from "express";
import orderModel from "../models/orderModel.js";
import Stripe from "stripe";
import userModel from "../models/userModel.js";
import axios from "axios";
import crypto from "crypto";

//global variable
const currency = "USD";
const deliveryCharge = 10;

//gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ================= COD =================
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
    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ================= STRIPE =================
const placeOrderStripe = async (req, res) => {
  try {
    const { amount, userId, items, address } = req.body;
    const { origin } = req.headers;

    const orderData = {
      userId,
      items,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      address,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: { name: "Delivery Charges" },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderID=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderID=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const verifyStripe = async (req, res) => {
  const { orderId, success, userId } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ================= ESEWA =================
const placeOrderEsewa = async (req, res) => {
  try {
    const { amount, userId, items, address } = req.body;
    const { origin } = req.headers;

    const orderData = {
      userId,
      items,
      amount,
      paymentMethod: "eSewa",
      payment: false,
      address,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const amt = amount;
    const oid = newOrder._id.toString();
    const product_code = process.env.ESEWA_SANDBOX_CODE; // EPAYTEST
    const su = `${process.env.BACKEND_URL}/api/order/esewa-success`;
    const fu = `${process.env.BACKEND_URL}/api/order/esewa-failure`;

    // HMAC signature
    const secretKey = process.env.ESEWA_SECRET_KEY;
    const signedFieldNames = "total_amount,transaction_uuid,product_code";
    const signature = crypto
      .createHmac("sha256", secretKey)
      .update(`${amt}${oid}${product_code}`)
      .digest("base64");

    res.json({
      success: true,
      amt,
      oid,
      product_code,
      signedFieldNames,
      signature,
      su,
      fu,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const verifyEsewa = async (req, res) => {
  const { amt, oid, refId } = req.query;
  try {
    const verificationResponse = await axios.post(
      "https://rc-epay.esewa.com.np/epay/transrec",
      null,
      {
        params: {
          amt,
          rid: refId,
          pid: oid,
          scd: process.env.ESEWA_SANDBOX_CODE,
        },
      }
    );

    if (verificationResponse.data.includes("Success")) {
      await orderModel.findByIdAndUpdate(oid, { payment: true });
      return res.redirect(
        `http://localhost:5173/verify?success=true&orderID=${oid}`
      );
    } else {
      return res.redirect(
        `http://localhost:5173/verify?success=false&orderID=${oid}`
      );
    }
  } catch (error) {
    console.log(error);
    return res.redirect(
      `http://localhost:5173/verify?success=false&orderID=${oid}`
    );
  }
};

const esewaFailure = async (req, res) => {
  const { oid } = req.query;
  await orderModel.findByIdAndDelete(oid);
  return res.redirect(
    `http://localhost:5173/verify?success=false&orderID=${oid}`
  );
};

// ================= ADMIN & USER =================
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  verifyStripe,
  placeOrderEsewa,
  verifyEsewa,
  esewaFailure,
  allOrders,
  userOrders,
  updateStatus,
};
