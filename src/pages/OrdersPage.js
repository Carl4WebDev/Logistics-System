import OrdersTable from "../components/Order/OrdersTable";

const OrdersPages = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        <OrdersTable />
      </div>
    </div>
  );
};

export default OrdersPages;
