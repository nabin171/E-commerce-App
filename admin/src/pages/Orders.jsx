import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import currency from "../App";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/admin_assets/assets";
import {
  Package,
  User,
  MapPin,
  Calendar,
  CreditCard,
  Truck,
} from "lucide-react";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        {
          orderId,
          status: e.target.value,
        },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
        toast.success("Order status updated successfully!");
      }
    } catch (error) {
      toast.error("Failed to update order status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Order Placed":
        return "bg-blue-100 text-blue-800";
      case "Packing":
        return "bg-orange-100 text-orange-800";
      case "Shipped":
        return "bg-purple-100 text-purple-800";
      case "Out for delivery":
        return "bg-yellow-100 text-yellow-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-3 sm:p-4 lg:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 rounded-full flex items-center justify-center">
                <Package className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gray-800 bg-clip-text text-transparent">
                  Order Management
                </h1>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Manage all customer orders
                </p>
              </div>
            </div>
            <div className="bg-gray-800 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-full text-sm font-semibold w-full sm:w-auto text-center">
              Total Orders: <span className="font-bold">{orders.length}</span>
            </div>
          </div>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-xl sm:rounded-2xl p-8 sm:p-12 text-center border border-white/20">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
            </div>
            <p className="text-gray-500 text-base sm:text-xl font-medium">
              No orders found
            </p>
            <p className="text-gray-400 text-sm sm:text-base mt-2">
              Orders will appear here once customers start placing them
            </p>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {orders.map((order, index) => (
              <div
                key={index}
                className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20"
              >
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <img
                      src={assets.parcel_icon}
                      alt="Parcel Icon"
                      className="w-8 h-8 sm:w-10 sm:h-10"
                    />
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-gray-900">
                        Order #{index + 1}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </div>
                </div>

                {/* Mobile: Stacked Layout, Desktop: Grid Layout */}
                <div className="space-y-4 lg:grid lg:grid-cols-3 lg:gap-6 lg:space-y-0">
                  {/* Items Section */}
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg sm:rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <Package className="w-4 h-4 text-gray-600" />
                      <h5 className="text-sm font-semibold text-gray-900">
                        Items Ordered ({order.items.length})
                      </h5>
                    </div>
                    <div className="space-y-1 sm:space-y-2 max-h-32 overflow-y-auto">
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="text-xs sm:text-sm text-gray-700 flex flex-wrap items-center gap-1"
                        >
                          <span className="font-medium">{item.name}</span>
                          <span className="text-gray-500">
                            ×{item.quantity}
                          </span>
                          <span className="text-gray-400 bg-gray-200 px-1.5 py-0.5 rounded text-xs">
                            {item.size}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg sm:rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <User className="w-4 h-4 text-gray-600" />
                      <h5 className="text-sm font-semibold text-gray-900">
                        Customer Info
                      </h5>
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <p className="font-medium text-gray-900 text-sm">
                        {order.address.firstName + " " + order.address.lastName}
                      </p>
                      <div className="text-xs sm:text-sm text-gray-600 space-y-0.5">
                        <p className="flex items-start gap-1">
                          <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                          <span>{order.address.street}</span>
                        </p>
                        <p className="text-xs text-gray-500 ml-4">
                          {order.address.city}, {order.address.state},{" "}
                          {order.address.country} {order.address.zipcode}
                        </p>
                        <p className="font-medium text-gray-700 mt-1">
                          📞 {order.address.phone}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg sm:rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <CreditCard className="w-4 h-4 text-gray-600" />
                      <h5 className="text-sm font-semibold text-gray-900">
                        Order Details
                      </h5>
                    </div>
                    <div className="space-y-2 text-xs sm:text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Payment Method:</span>
                        <span className="font-medium text-gray-900 bg-white px-2 py-0.5 rounded">
                          {order.paymentMethod}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Payment Status:</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                            order.payment
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {order.payment ? "✓ Paid" : "⏳ Pending"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Order Date:</span>
                        <span className="font-medium text-gray-900">
                          {new Date(order.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
                  {/* Amount */}
                  <div className="bg-gray-800 text-white px-4 py-3 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl font-bold text-lg sm:text-xl text-center">
                    {currency.symbol || "$"}
                    {order.amount}
                  </div>

                  {/* Status Select */}
                  <div className="flex-1 sm:flex-initial sm:min-w-0 sm:w-64">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <Truck className="w-4 h-4" />
                      Update Status:
                    </label>
                    <select
                      onChange={(e) => statusHandler(e, order._id)}
                      value={order.status}
                      className="w-full px-3 py-2 sm:px-4 sm:py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white font-medium text-sm transition-all duration-200 touch-manipulation"
                    >
                      <option value="Order Placed">📋 Order Placed</option>
                      <option value="Packing">📦 Packing</option>
                      <option value="Shipped">🚛 Shipped</option>
                      <option value="Out for delivery">
                        🚚 Out for delivery
                      </option>
                      <option value="Delivered">✅ Delivered</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
