import express from "express";
import {
  loginUser,
  registerUser,
  adminLogin,
} from "../controllers/userController.js";
import { googleLogin } from "../controllers/googleAuthController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);

// ✅ Add Google login route
userRouter.post("/googlelogin", googleLogin);

export default userRouter;
