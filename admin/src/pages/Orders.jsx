import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import currency from "../App";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/admin_assets/assets";

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
      const resposne = await axios.post(
        backendUrl + "/api/order/status",
        {
          orderId,
          status: event.target.value,
        },
        { headers: { token } }
      );
      if (resposne.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 p-6 bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl border border-white border-opacity-20">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4 sm:mb-0">
            Order Management
          </h3>
          <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-balck font-semibold">
            Total Orders:{" "}
            <span className="bg-white text-blue-600 px-3 py-1 rounded-full ml-2 font-bold">
              {orders.length}
            </span>
          </div>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="text-center py-16 bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl">
            <p className="text-white text-xl">No orders found</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-95 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Order Header */}
                <div className="flex items-center gap-4 mb-6 pb-4 border-b-2 border-gray-200">
                  <img
                    src={assets.parcel_icon}
                    alt="Parcel Icon"
                    className="w-10 h-10"
                  />
                  <h4 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Order #{index + 1}
                  </h4>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Items Section */}
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h5 className="text-white bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-2 rounded-lg text-sm font-semibold mb-3">
                      Items Ordered
                    </h5>
                    <div className="space-y-2">
                      {order.items.map((item, idx) => {
                        if (idx === order.items.length - 1) {
                          return (
                            <p key={idx} className="text-gray-700">
                              <span className="font-semibold">{item.name}</span>
                              <span className="text-blue-600 mx-2">
                                x{item.quantity}
                              </span>
                              <span className="text-gray-500">
                                ({item.size})
                              </span>
                            </p>
                          );
                        } else {
                          return (
                            <p key={idx} className="text-gray-700">
                              <span className="font-semibold">{item.name}</span>
                              <span className="text-blue-600 mx-2">
                                x{item.quantity}
                              </span>
                              <span className="text-gray-500">
                                ({item.size})
                              </span>
                              ,
                            </p>
                          );
                        }
                      })}
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h5 className="text-white bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-2 rounded-lg text-sm font-semibold mb-3">
                      Customer Info
                    </h5>
                    <div className="space-y-2">
                      <p className="font-bold text-gray-900">
                        {order.address.firstName + " " + order.address.lastName}
                      </p>
                      <p className="text-gray-600">{order.address.street}</p>
                      <p className="text-gray-600">
                        {order.address.city +
                          ", " +
                          order.address.state +
                          ", " +
                          order.address.country +
                          ", " +
                          order.address.zipcode}
                      </p>
                      <p className="text-blue-600 font-semibold">
                        {order.address.phone}
                      </p>
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h5 className="text-white bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-2 rounded-lg text-sm font-semibold mb-3">
                      Order Details
                    </h5>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Items:</span>
                        <span className="font-semibold">
                          {order.items.length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Method:</span>
                        <span className="font-semibold">
                          {order.paymentMethod}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment:</span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            order.payment
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {order.payment ? "Done" : "Pending"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date:</span>
                        <span className="font-semibold">
                          {new Date(order.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6 pt-6 border-t-2 border-gray-200">
                  {/* Amount */}
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold text-lg">
                    {currency.symbol || "$"}
                    {order.amount}
                  </div>

                  {/* Status Select */}
                  <div className="w-full md:w-auto">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Order Status:
                    </label>
                    <select
                      onChange={(e) => statusHandler(e, order._id)}
                      value={order.status}
                      className="w-full md:w-auto px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white font-semibold"
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
