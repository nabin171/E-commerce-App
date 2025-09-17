import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCLoudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import contactRouter from "./routes/contactRoute.js";

const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCLoudinary();

//middlewares
app.use(express.json());
app.use(cors());

//api endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/contact", contactRouter);

app.get("/", (req, res) => {
  res.send("APi working");
});

app.listen(port, () => console.log("Server starting on PORT:", +port));
