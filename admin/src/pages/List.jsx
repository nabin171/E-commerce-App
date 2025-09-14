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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Package className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Product List
            </h1>
            <p className="text-gray-600 text-sm">All products you’ve added</p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {products.length === 0 ? (
              <p className="text-center text-gray-500 col-span-full">
                No products found.
              </p>
            ) : (
              products.map((product) => (
                <div
                  key={product._id}
                  className="relative bg-white border border-gray-200 rounded-xl shadow hover:shadow-md transition-all duration-200 p-4 flex flex-col"
                >
                  {/* Cross icon for delete */}
                  <button
                    type="button"
                    aria-label="Delete product"
                    onClick={() => handleDelete(product._id)}
                    className="absolute right-3 top-3 rounded-full p-1 hover:bg-gray-100 transition"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>

                  <img
                    src={getImageUrl(product)}
                    alt={product.name || "Product"}
                    className="w-full h-40 object-cover rounded-md mb-4"
                    loading="lazy"
                  />
                  <h2 className="text-lg font-semibold text-gray-800">
                    {product.name}
                  </h2>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                    {product.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-blue-600 font-bold">
                      ${product.price}
                    </span>
                    <span className="text-xs text-gray-500">
                      {product.category} / {product.subCategory}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
