import { backendUrl } from "../App";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Upload, Package, Tag, DollarSign } from "lucide-react";
import { assets } from "../assets/admin_assets/assets";
import { toast } from "react-toastify";

const TARGET_WIDTH = 390;
const TARGET_HEIGHT = 450;

// Helper: resize + center-crop to exact dimensions, return a Blob
async function resizeFileToBlob(
  file,
  width = TARGET_WIDTH,
  height = TARGET_HEIGHT,
  quality = 0.85
) {
  if (!file) return null;

  // Reject SVGs (canvas drawing from SVG may produce issues); you can add SVG handling separately if needed
  if (file.type === "image/svg+xml") {
    // fallback: return original file (server should handle)
    return file;
  }

  return new Promise((resolve, reject) => {
    const img = new Image();

    // To avoid tainted canvas for remote sources, we use dataURL from the file, so crossOrigin not required
    const reader = new FileReader();

    reader.onerror = (e) => reject(e);
    reader.onload = () => {
      img.onload = () => {
        try {
          const srcW = img.width;
          const srcH = img.height;
          const srcRatio = srcW / srcH;
          const dstRatio = width / height;

          let sx = 0,
            sy = 0,
            sWidth = srcW,
            sHeight = srcH;

          if (srcRatio > dstRatio) {
            // source is wider -> crop sides
            sWidth = Math.round(srcH * dstRatio);
            sx = Math.round((srcW - sWidth) / 2);
          } else {
            // source is taller -> crop top/bottom
            sHeight = Math.round(srcW / dstRatio);
            sy = Math.round((srcH - sHeight) / 2);
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");

          // If original has transparency and we want to keep it, choose PNG. Otherwise choose JPEG.
          const keepAlpha =
            file.type === "image/png" || file.type === "image/webp";
          const outType = keepAlpha ? "image/png" : "image/jpeg";

          // draw cropped region to destination
          ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, width, height);

          // convert to blob
          canvas.toBlob(
            (blob) => {
              if (!blob) return reject(new Error("Canvas is empty"));
              // Some browsers may generate type incorrectly; ensure blob.type is usable
              if (
                blob.type === "image/png" ||
                blob.type === "image/jpeg" ||
                blob.type === "image/webp"
              ) {
                resolve(blob);
              } else {
                // fallback to jpeg
                canvas.toBlob((b2) => resolve(b2), "image/jpeg", quality);
              }
            },
            outType,
            quality
          );
        } catch (err) {
          reject(err);
        }
      };

      img.onerror = (e) => {
        reject(e);
      };

      img.src = reader.result;
    };

    reader.readAsDataURL(file);
  });
}

const Add = ({ token }) => {
  // store 4 files (resized blobs) or null
  const [images, setImages] = useState([null, null, null, null]);
  // preview URLs for resized images
  const [previews, setPreviews] = useState([null, null, null, null]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  // Keep track of object URLs so we can revoke them
  const objectUrlsRef = useRef([]);

  useEffect(() => {
    return () => {
      // cleanup on unmount
      objectUrlsRef.current.forEach((u) => URL.revokeObjectURL(u));
      objectUrlsRef.current = [];
    };
  }, []);

  // Generic handler for any of the 4 image inputs
  const handleImageChange = (index) => async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Resize client-side (center-crop to 390x450)
      const blob = await resizeFileToBlob(file);

      // Create preview URL for resized blob
      const url = URL.createObjectURL(blob);
      objectUrlsRef.current.push(url);

      setImages((prev) => {
        const copy = [...prev];
        copy[index] = blob;
        return copy;
      });
      setPreviews((prev) => {
        const copy = [...prev];
        // revoke previous preview for this index if exists
        if (copy[index]) {
          try {
            URL.revokeObjectURL(copy[index]);
          } catch {}
        }
        copy[index] = url;
        return copy;
      });
    } catch (err) {
      console.error("Resize failed", err);
      toast.error("Failed to process image. Please try a different file.");
    }
  };

  const makePreviewOrDefault = (idx) => {
    return previews[idx] || assets.upload_area;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      // append only if exists; give filenames
      images.forEach((imgBlob, idx) => {
        if (imgBlob) {
          // prefer original extension if available; otherwise .jpg
          const ext = imgBlob.type === "image/png" ? "png" : "jpg";
          const filename = `image${idx + 1}-${Date.now()}.${ext}`;
          formData.append(`image${idx + 1}`, imgBlob, filename);
        }
      });

      const req = axios.post(backendUrl + "/api/product/add", formData, {
        headers: { token },
        timeout: 20000,
      });

      await toast.promise(req, {
        pending: "Adding product…",
        success: {
          render({ data }) {
            return data?.data?.message || "Product added successfully";
          },
        },
        error: {
          render({ data }) {
            return (
              data?.response?.data?.message ||
              data?.message ||
              "Failed to add product"
            );
          },
        },
      });

      const response = await req;
      if (response.data?.success) {
        // Reset everything
        setName("");
        setDescription("");
        setImages([null, null, null, null]);
        // revoke and clear previews
        objectUrlsRef.current.forEach((u) => URL.revokeObjectURL(u));
        objectUrlsRef.current = [];
        setPreviews([null, null, null, null]);
        setPrice("");
        setSizes([]);
        setBestseller(false);
      } else {
        toast.error(response.data?.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      if (error?.message) toast.error(error.message);
    }
  };

  // Reset button handler
  const handleReset = () => {
    setName("");
    setDescription("");
    setImages([null, null, null, null]);
    objectUrlsRef.current.forEach((u) => URL.revokeObjectURL(u));
    objectUrlsRef.current = [];
    setPreviews([null, null, null, null]);
    setPrice("");
    setSizes([]);
    setBestseller(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Package className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Add New Product
            </h1>
            <p className="text-gray-600 text-sm">
              Fill in the product details below
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Image Upload Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Upload className="w-5 h-5 text-gray-600" />
                <p className="text-lg font-semibold text-gray-800">
                  Upload Images
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[0, 1, 2, 3].map((i) => (
                  <label
                    key={i}
                    htmlFor={`image${i + 1}`}
                    className="group cursor-pointer inline-block"
                  >
                    <div className="relative">
                      <img
                        src={makePreviewOrDefault(i)}
                        loading="lazy"
                        alt={`upload-${i + 1}`}
                        className="w-full h-auto object-cover"
                      />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">
                        {i + 1}
                      </div>
                    </div>
                    <input
                      onChange={handleImageChange(i)}
                      type="file"
                      id={`image${i + 1}`}
                      accept="image/*"
                      hidden
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Product Details (kept same as your original form) */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <Tag className="w-4 h-4" />
                  Product Name
                </label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  placeholder="Enter product name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 focus:bg-white hover:border-gray-300"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Product Description
                </label>
                <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  placeholder="Write detailed product description here..."
                  rows={4}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 focus:bg-white hover:border-gray-300 resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Product Category
                </label>
                <select
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 focus:bg-white hover:border-gray-300"
                >
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Sub Category
                </label>
                <select
                  onChange={(e) => setSubCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 focus:bg-white hover:border-gray-300"
                >
                  <option value="Topwear">Topwear</option>
                  <option value="Bottomwear">Bottomwear</option>
                  <option value="Winterwear">Winterwear</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <DollarSign className="w-4 h-4" />
                  Product Price
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                    $
                  </span>
                  <input
                    onChange={(e) => setPrice(e.target.value)}
                    type="number"
                    value={price}
                    placeholder="20"
                    step="1"
                    min="0"
                    className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 focus:bg-white hover:border-gray-300"
                    required
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Product Sizes
                </label>
                <div className="flex flex-wrap gap-3">
                  {["S", "M", "L", "XL", "XXL"].map((s) => (
                    <div
                      key={s}
                      onClick={() =>
                        setSizes((prev) =>
                          prev.includes(s)
                            ? prev.filter((item) => item !== s)
                            : [...prev, s]
                        )
                      }
                    >
                      <p
                        className={`${
                          sizes.includes(s)
                            ? "bg-blue-500 text-white border-blue-500"
                            : "bg-gray-50 text-gray-600 border-gray-300"
                        } cursor-pointer px-4 py-2 border-2 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 rounded-xl font-medium text-sm transition-all duration-200 hover:scale-105 select-none`}
                      >
                        {s}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  onChange={() => setBestseller((prev) => !prev)}
                  checked={bestseller}
                  type="checkbox"
                  id="bestseller"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  className="cursor-pointer text-sm font-medium text-gray-700"
                  htmlFor="bestseller"
                >
                  Add to bestseller
                </label>
              </div>

              <div className="flex gap-4 pt-6 md:col-span-2">
                <button
                  type="submit"
                  className="cursor-pointer flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                >
                  Add Product
                </button>

                <button
                  type="button"
                  className="cursor-pointer px-8 py-3 border-2 bg-gradient-to-r from-purple-600 to-blue-600 border-gray-300 text-white rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add;
