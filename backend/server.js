import express from "express";
import cors from "cors";
// VERY TOP of server.js
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") }); // ensures the right file

import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";

const app = express();
const port = process.env.PORT || 4000;

connectDB();
connectCloudinary();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.use("/api/product", productRouter); // => /api/product/add

app.get("/", (req, res) => res.send("API working"));

app.use((req, res) =>
  res.status(404).send(`Cannot ${req.method} ${req.originalUrl}`)
);
app.use((err, req, res, next) => {
  console.error("ERROR:", err);
  res.status(500).json({ error: err.message || "Server error" });
});

app.listen(port, () => console.log("Server started on PORT:", port));
