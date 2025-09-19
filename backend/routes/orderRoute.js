import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";
import {
  placeOrder,
  placeOrderEsewa,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
  verifyEsewa,
  esewaFailure,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

// ================= ADMIN =================
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

// ================= PLACE ORDERS =================
orderRouter.post("/place", authUser, placeOrder); // COD
orderRouter.post("/stripe", authUser, placeOrderStripe); // Stripe
orderRouter.post("/esewa", authUser, placeOrderEsewa); // eSewa

// ================= USER =================
orderRouter.post("/userorders", authUser, userOrders);

// ================= VERIFY PAYMENTS =================
orderRouter.post("/verifyStripe", authUser, verifyStripe); // Stripe
orderRouter.get("/esewa-success", verifyEsewa); // eSewa success callback
orderRouter.get("/esewa-failure", esewaFailure); // eSewa failure callback

export default orderRouter;
