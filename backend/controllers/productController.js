// backend/controllers/productController.js
import { cloudinary } from "../config/cloudinary.js";

// helper: upload a single buffer to Cloudinary via stream
const uploadBufferToCloudinary = (fileBuffer, filename, folder = "products") =>
  new Promise((resolve, reject) => {
    const publicId = filename ? filename.replace(/\.[^.]+$/, "") : undefined;

    const stream = cloudinary.uploader.upload_stream(
      { folder, public_id: publicId, resource_type: "image" },
      (err, result) => (err ? reject(err) : resolve(result))
    );
    stream.end(fileBuffer);
  });

const toBool = (v) => v === true || v === "true" || v === 1 || v === "1";
// Parse sizes if it comes as "M,L,XL" or JSON string or array
const normalizeSizes = (sizes) => {
  if (!sizes) return [];
  if (Array.isArray(sizes)) return sizes;
  if (typeof sizes === "string") {
    // try JSON first
    try {
      const parsed = JSON.parse(sizes);
      if (Array.isArray(parsed)) return parsed;
    } catch {}
    // fallback: comma-separated
    return sizes
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
};

export const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    // Multer .fields(): files live in req.files.<field>[0]
    const f1 = req.files?.image1?.[0];
    const f2 = req.files?.image2?.[0];
    const f3 = req.files?.image3?.[0];
    const f4 = req.files?.image4?.[0];

    // Upload images that exist
    const files = [f1, f2, f3, f4].filter(Boolean);

    const uploads = await Promise.all(
      files.map(async (f) => {
        const result = await uploadBufferToCloudinary(
          f.buffer,
          f.originalname,
          "products"
        );
        return {
          url: result.secure_url,
          public_id: result.public_id,
          width: result.width,
          height: result.height,
          format: result.format,
        };
      })
    );

    // Build product object (replace with your DB model create)
    const product = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: normalizeSizes(sizes),
      bestseller: toBool(bestseller),
      images: uploads,
    };

    // TODO: save to DB, e.g.:
    // const saved = await Product.create(product);

    return res.status(201).json({ success: true, product /*: saved*/ });
  } catch (error) {
    console.error("addProduct error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// stubs
export const listProduct = async (req, res) => {};
export const removeProduct = async (req, res) => {};
export const singleProduct = async (req, res) => {};
