import { useState } from "react";

const OrderTable = () => {
  // Sample order data
  const [orders] = useState([
    { id: "ORD001", customer: "John Doe", status: "Pending", total: "$150.00" },
    { id: "ORD002", customer: "Jane Smith", status: "Shipped", total: "$200.00" },
    { id: "ORD003", customer: "Mike Johnson", status: "Delivered", total: "$100.00" },
  ]);

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Order List</h2>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">Order ID</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Customer</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{order.id}</td>
                <td className="border border-gray-300 px-4 py-2">{order.customer}</td>
                <td className="border border-gray-300 px-4 py-2">{order.status}</td>
                <td className="border border-gray-300 px-4 py-2">{order.total}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4">No orders found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
