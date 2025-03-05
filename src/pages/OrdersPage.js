import React, { useState } from "react";
import OrdersTable from "../components/Order/OrdersTable";

const OrdersPage = () => {
  const [orders] = useState([
    { id: 1, customer: "John Doe", address: "123 Main St" },
    { id: 2, customer: "Jane Smith", address: "456 Elm St" },
  ]);

  const [shipmentForm, setShipmentForm] = useState({
    orderId: "",
    recipient: "",
    address: "",
    trackingNumber: "",
    deliveryDate: "",
  });

  const [isFormOpen, setIsFormOpen] = useState(false);

  const generateTrackingNumber = () => {
    return "TRK-" + Math.floor(100000 + Math.random() * 900000);
  };

  const handleCreateShipment = (order) => {
    setShipmentForm({
      orderId: order.id,
      recipient: order.customer,
      address: order.address,
      trackingNumber: generateTrackingNumber(),
      deliveryDate: "",
    });
    setIsFormOpen(true);
  };

  const handleInputChange = (e) => {
    setShipmentForm({ ...shipmentForm, [e.target.name]: e.target.value });
  };

  const handleSubmitShipment = () => {
    console.log("Shipment Created:", shipmentForm);
    setIsFormOpen(false);
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        <OrdersTable orders={orders} onCreateShipment={handleCreateShipment} />
      </div>

      {/* Shipment Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Create Shipment</h2>
            <label className="block mb-2">
              Order ID: <strong>{shipmentForm.orderId}</strong>
            </label>
            <label className="block mb-2">
              Recipient:
              <input
                type="text"
                name="recipient"
                value={shipmentForm.recipient}
                readOnly
                className="w-full border p-2 rounded"
              />
            </label>
            <label className="block mb-2">
              Address:
              <input
                type="text"
                name="address"
                value={shipmentForm.address}
                readOnly
                className="w-full border p-2 rounded"
              />
            </label>
            <label className="block mb-2">
              Tracking Number:
              <input
                type="text"
                name="trackingNumber"
                value={shipmentForm.trackingNumber}
                readOnly
                className="w-full border p-2 rounded"
              />
            </label>
            <label className="block mb-2">
              Estimated Delivery Date:
              <input
                type="date"
                name="deliveryDate"
                value={shipmentForm.deliveryDate}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
            </label>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setIsFormOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitShipment}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                Save Shipment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
