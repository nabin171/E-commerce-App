import { backendUrl } from "../App";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Upload, Package, Tag, DollarSign } from "lucide-react";
import { assets } from "../assets/admin_assets/assets";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  // Keep track of any object URLs so we can revoke them and avoid memory leaks
  const objectUrlsRef = useRef([]);

  const makePreviewUrl = (file) => {
    if (!file) return null;
    const url = URL.createObjectURL(file);
    objectUrlsRef.current.push(url);
    return url;
  };

  useEffect(() => {
    // Cleanup any created object URLs on unmount
    return () => {
      objectUrlsRef.current.forEach((u) => URL.revokeObjectURL(u));
      objectUrlsRef.current = [];
    };
  }, []);

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

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      // Kick off the request
      const req = axios.post(backendUrl + "/api/product/add", formData, {
        headers: { token },
        timeout: 15000, // fail faster than hanging forever; tweak as you like
      });

      // Show immediate feedback while it’s uploading/processing
      await toast.promise(req, {
        pending: "Adding product…",
        success: {
          render({ data }) {
            // axios resolves with { data: ... }
            return data?.data?.message || "Product added successfully";
          },
        },
        error: {
          render({ data }) {
            // data is the error object from axios
            return (
              data?.response?.data?.message ||
              data?.message ||
              "Failed to add product"
            );
          },
        },
      });

      // If we reach here, request succeeded. Read the resolved response:
      const response = await req;

      if (response.data?.success) {
        // Reset fields exactly like your original code
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
        // also clear sizes/bestseller if you want to, but keeping your original state
      } else {
        // In case backend returns success: false without throwing
        toast.error(response.data?.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      // toast.promise already showed an error toast, but keep this for parity with your original flow
      if (error?.message) toast.error(error.message);
    }
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
                {/* Image 1 */}
                <label
                  htmlFor="image1"
                  className="group cursor-pointer inline-block"
                >
                  <div className="relative">
                    <img
                      src={
                        !image1 ? assets.upload_area : makePreviewUrl(image1)
                      }
                      loading="lazy"
                      alt=""
                    />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">
                      1
                    </div>
                  </div>
                  <input
                    onChange={(e) => setImage1(e.target.files[0])}
                    type="file"
                    id="image1"
                    accept="image/*"
                    hidden
                  />
                </label>

                <label
                  htmlFor="image2"
                  className="group cursor-pointer inline-block"
                >
                  <div className="relative">
                    <img
                      src={
                        !image2 ? assets.upload_area : makePreviewUrl(image2)
                      }
                      loading="lazy"
                      alt=""
                    />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">
                      2
                    </div>
                  </div>
                  <input
                    onChange={(e) => setImage2(e.target.files[0])}
                    type="file"
                    id="image2"
                    accept="image/*"
                    hidden
                  />
                </label>

                <label
                  htmlFor="image3"
                  className="group cursor-pointer inline-block"
                >
                  <div className="relative">
                    <img
                      src={
                        !image3 ? assets.upload_area : makePreviewUrl(image3)
                      }
                      loading="lazy"
                      alt=""
                    />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">
                      3
                    </div>
                  </div>
                  <input
                    onChange={(e) => setImage3(e.target.files[0])}
                    type="file"
                    id="image3"
                    accept="image/*"
                    hidden
                  />
                </label>

                <label
                  htmlFor="image4"
                  className="group cursor-pointer inline-block"
                >
                  <div className="relative">
                    <img
                      src={
                        !image4 ? assets.upload_area : makePreviewUrl(image4)
                      }
                      loading="lazy"
                      alt=""
                    />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">
                      4
                    </div>
                  </div>
                  <input
                    onChange={(e) => setImage4(e.target.files[0])}
                    type="file"
                    id="image4"
                    accept="image/*"
                    hidden
                  />
                </label>
              </div>
            </div>

            {/* Product Details */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Product Name */}
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

              {/* Product Description */}
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

              {/* Category */}
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

              {/* Sub Category */}
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

              {/* Product Price */}
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

              {/* Sizes */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Product Sizes
                </label>
                <div className="flex flex-wrap gap-3">
                  <div
                    onClick={() =>
                      setSizes((prev) =>
                        prev.includes("S")
                          ? prev.filter((item) => item !== "S")
                          : [...prev, "S"]
                      )
                    }
                  >
                    <p
                      className={`${
                        sizes.includes("S")
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-gray-50 text-gray-600 border-gray-300"
                      } cursor-pointer px-4 py-2 border-2 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 rounded-xl font-medium text-sm transition-all duration-200 hover:scale-105 select-none`}
                    >
                      S
                    </p>
                  </div>

                  <div
                    onClick={() =>
                      setSizes((prev) =>
                        prev.includes("M")
                          ? prev.filter((item) => item !== "M")
                          : [...prev, "M"]
                      )
                    }
                  >
                    <p
                      className={`${
                        sizes.includes("M")
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-gray-50 text-gray-600 border-gray-300"
                      } cursor-pointer px-4 py-2 border-2 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 rounded-xl font-medium text-sm transition-all duration-200 hover:scale-105 select-none`}
                    >
                      M
                    </p>
                  </div>

                  <div
                    onClick={() =>
                      setSizes((prev) =>
                        prev.includes("L")
                          ? prev.filter((item) => item !== "L")
                          : [...prev, "L"]
                      )
                    }
                  >
                    <p
                      className={`${
                        sizes.includes("L")
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-gray-50 text-gray-600 border-gray-300"
                      } cursor-pointer px-4 py-2 border-2 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 rounded-xl font-medium text-sm transition-all duration-200 hover:scale-105 select-none`}
                    >
                      L
                    </p>
                  </div>

                  <div
                    onClick={() =>
                      setSizes((prev) =>
                        prev.includes("XL")
                          ? prev.filter((item) => item !== "XL")
                          : [...prev, "XL"]
                      )
                    }
                  >
                    <p
                      className={`${
                        sizes.includes("XL")
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-gray-50 text-gray-600 border-gray-300"
                      } cursor-pointer px-4 py-2 border-2 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 rounded-xl font-medium text-sm transition-all duration-200 hover:scale-105 select-none`}
                    >
                      XL
                    </p>
                  </div>

                  <div
                    onClick={() =>
                      setSizes((prev) =>
                        prev.includes("XXL")
                          ? prev.filter((item) => item !== "XXL")
                          : [...prev, "XXL"]
                      )
                    }
                  >
                    <p
                      className={`${
                        sizes.includes("XXL")
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-gray-50 text-gray-600 border-gray-300"
                      } cursor-pointer px-4 py-2 border-2 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 rounded-xl font-medium text-sm transition-all duration-200 hover:scale-105 select-none`}
                    >
                      XXL
                    </p>
                  </div>
                </div>
              </div>

              {/* Bestseller Checkbox */}
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

              {/* Submit Button */}
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
                  onClick={() => {
                    setName("");
                    setDescription("");
                    setImage1(false);
                    setImage2(false);
                    setImage3(false);
                    setImage4(false);
                    setPrice("");
                    setSizes([]);
                    setBestseller(false);
                  }}
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
