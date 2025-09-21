import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { Package, X } from "lucide-react";
import { assets } from "../assets/admin_assets/assets";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(backendUrl + "/api/product/list", {
          headers: { token },
        });
        if (response.data?.success) {
          setProducts(response.data.products || []);
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to load products.");
      }
    };
    fetchProducts();
  }, [token]);

  // Build a safe, absolute URL for images; fallback to placeholder
  const getImageUrl = (p) => {
    const raw =
      p?.image1 ||
      p?.image ||
      (Array.isArray(p?.images) ? p.images[0] : null) ||
      (Array.isArray(p?.imageUrls) ? p.imageUrls[0] : null);

    if (!raw) return assets.upload_area;
    if (typeof raw === "string" && /^https?:\/\//i.test(raw)) return raw;

    try {
      return new URL(
        String(raw).replace(/^\//, ""),
        backendUrl.replace(/\/$/, "/")
      ).toString();
    } catch {
      return raw;
    }
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Delete this product?");
    if (!ok) return;
    try {
      const deleteRequest = axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );

      await toast.promise(deleteRequest, {
        pending: "Removing product…",
        success: "Product removed successfully!",
        error: "Failed to remove product",
      });

      const res = await deleteRequest;
      if (res.data?.success) {
        setProducts((prev) => prev.filter((p) => p._id !== id));
      } else {
        toast.error(res.data?.message || "Delete failed.");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Error removing product.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-3 sm:p-4 lg:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/20">
          <div className="text-center mb-6 sm:mb-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-800 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center">
              <Package className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gray-800 bg-clip-text text-transparent mb-2">
              Product List
            </h1>
            <p className="text-gray-600 text-xs sm:text-sm">
              All products you've added
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            {products.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-12 sm:py-16">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Package className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
                </div>
                <p className="text-center text-gray-500 text-sm sm:text-base">
                  No products found.
                </p>
                <p className="text-center text-gray-400 text-xs sm:text-sm mt-1">
                  Add your first product to get started
                </p>
              </div>
            ) : (
              products.map((product) => (
                <div
                  key={product._id}
                  className="relative bg-white border border-gray-200 rounded-lg sm:rounded-xl shadow hover:shadow-lg transition-all duration-200 p-3 sm:p-4 flex flex-col group"
                >
                  {/* Cross icon for delete */}
                  <button
                    type="button"
                    aria-label="Delete product"
                    onClick={() => handleDelete(product._id)}
                    className="absolute right-2 top-2 sm:right-3 sm:top-3 rounded-full p-1.5 sm:p-2 hover:bg-red-50 hover:text-red-600 transition-all duration-200 opacity-70 group-hover:opacity-100 z-10 touch-manipulation"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>

                  <div className="relative mb-3 sm:mb-4">
                    <img
                      src={getImageUrl(product)}
                      alt={product.name || "Product"}
                      className="w-full h-32 sm:h-40 lg:h-48 object-cover rounded-md sm:rounded-lg"
                      loading="lazy"
                    />
                    {/* Bestseller badge */}
                    {product.bestseller && (
                      <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold shadow-sm">
                        ⭐ Best
                      </div>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col">
                    <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2 line-clamp-2">
                      {product.name}
                    </h2>

                    <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 mb-2 sm:mb-3 flex-1">
                      {product.description}
                    </p>

                    {/* Sizes display */}
                    {product.sizes && product.sizes.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2 sm:mb-3">
                        {product.sizes.slice(0, 3).map((size, idx) => (
                          <span
                            key={idx}
                            className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium"
                          >
                            {size}
                          </span>
                        ))}
                        {product.sizes.length > 3 && (
                          <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-gray-100 text-gray-600 rounded text-xs">
                            +{product.sizes.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="mt-auto">
                      <div className="flex items-center justify-between mb-1 sm:mb-2">
                        <span className="text-lg sm:text-xl font-bold text-gray-900">
                          ${product.price}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        <span className="bg-gray-50 px-2 py-1 rounded-full">
                          {product.category}
                        </span>
                        <span className="mx-1">•</span>
                        <span className="bg-gray-50 px-2 py-1 rounded-full">
                          {product.subCategory}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Product count footer */}
          {products.length > 0 && (
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 text-center">
              <p className="text-xs sm:text-sm text-gray-500">
                Showing {products.length} product
                {products.length !== 1 ? "s" : ""}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default List;
