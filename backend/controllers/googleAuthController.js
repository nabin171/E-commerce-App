import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    // Verify Google ID token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name,
        email,
        picture,
        isGoogleUser: true,
        cartData: {},
      });
    }

    // Generate JWT
    const appToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token: appToken,
      user,
    });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(401).json({ success: false, message: "Invalid Google token" });
  }
};
