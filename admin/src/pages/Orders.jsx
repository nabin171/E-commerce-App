import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../App";
import { assets } from "../assets/admin_assets/assets";
import { Package } from "lucide-react";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return null;
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
        { orderId, status: e.target.value },
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
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <h1 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
            MY ORDERS
          </h1>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-lg p-6 sm:p-8 text-center border">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Package className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm sm:text-base font-medium">
              No orders found
            </p>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              Your orders will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-0 bg-white rounded-lg border overflow-hidden">
            {orders.map((order, index) => (
              <div
                key={index}
                className="border-b last:border-b-0 border-gray-200"
              >
                {/* Each Order Row */}
                <div className="py-3 sm:py-4 px-3 sm:px-4 flex flex-col sm:flex-row sm:items-center justify-between">
                  {/* Product Info */}
                  <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
                    <div className="w-12 h-12 bg-gray-100 rounded flex-shrink-0 overflow-hidden">
                      <img
                        src={assets.parcel_icon}
                        alt="Product"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0 pt-1">
                      <h3 className="text-sm font-medium text-gray-900 leading-tight mb-1">
                        {order.items.length > 0
                          ? order.items[0].name
                          : "Order Items"}
                      </h3>
                      <div className="text-xs text-gray-600 leading-tight mb-1">
                        <span>
                          ${order.amount} Quantity:{" "}
                          {order.items.reduce(
                            (sum, item) => sum + item.quantity,
                            0
                          )}
                        </span>
                        {order.items.length > 0 && (
                          <span> Size: {order.items[0].size}</span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 leading-tight">
                        <div>
                          Date: {new Date(order.date).toLocaleDateString()}
                        </div>
                        <div>Payment: {order.paymentMethod}</div>
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex-shrink-0 flex justify-start sm:justify-end mt-2 sm:mt-0">
                    <div
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      <div className="w-1.5 h-1.5 bg-current rounded-full mr-1"></div>
                      {order.status}
                    </div>
                  </div>
                </div>

                {/* Status Update Dropdown */}
                <div className="px-3 sm:px-4 pb-3 border-t border-gray-100 bg-gray-50">
                  <div className="flex items-center justify-between pt-3">
                    <label className="text-xs font-medium text-gray-700">
                      Update Status:
                    </label>
                    <select
                      onChange={(e) => statusHandler(e, order._id)}
                      value={order.status}
                      className="text-xs px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    >
                      <option value="Order Placed">Order Placed</option>
                      <option value="Packing">Packing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for delivery">Out for delivery</option>
                      <option value="Delivered">Delivered</option>
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
