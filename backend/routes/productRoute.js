import express from "express";
import {
  addProduct,
  removeProduct,
  listProduct,
  singleProduct,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";

const productRouter = express.Router();
const requireMultipart = (req, res, next) => {
  const ct = req.headers["content-type"] || "";
  console.log("> Incoming Content-Type:", ct);
  if (!ct.startsWith("multipart/form-data")) {
    return res
      .status(415)
      .json({ error: "Expected multipart/form-data with a boundary" });
  }
  next();
};

productRouter.post(
  "/add",
  requireMultipart,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);

productRouter.post("/remove", removeProduct);
productRouter.post("/single", singleProduct);
productRouter.get("/list", listProduct);

export default productRouter;
