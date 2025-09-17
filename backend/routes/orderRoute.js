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
} from "../controllers/orderController.js";

const orderRouter = express.Router();

//Admin Features
orderRouter.post("/list", adminAuth, allOrders);

orderRouter.post("/status", adminAuth, updateStatus);

//Payment features
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.post("/esewa", authUser, placeOrderEsewa);

//USwe feature
orderRouter.post("/userorders", authUser, userOrders);

//vaerify Payemnt
orderRouter.post("/verifyStripe", authUser, verifyStripe);

export default orderRouter;
