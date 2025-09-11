import { v2 as cloudinary } from "cloudinary";

export default function connectCloudinary() {
  if (process.env.CLOUDINARY_URL) {
    cloudinary.config({ secure: true }); // reads CLOUDINARY_URL automatically
  } else {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
  }
  console.log("✅ Cloudinary configured");
}

export { cloudinary };
