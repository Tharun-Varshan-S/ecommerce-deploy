import { useEffect, useState } from "react";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";
import api from "../services/api";
import formatCurrency from "../utils/formatCurrency";
import { Card, PremiumBadge } from "../components/ui";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await api.get("/orders");
      setOrders(data);
      setLoading(false);
    };
    fetchOrders();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (!orders.length) return <EmptyState title="No orders yet" description="Your order history appears here." />;

  return (
    <Card className="p-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">My Orders</h1>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead className="border-b border-slate-200 dark:border-slate-700 text-slate-500">
            <tr>
              <th className="py-3">Order ID</th>
              <th className="py-3">Items</th>
              <th className="py-3">Status</th>
              <th className="py-3">Total</th>
              <th className="py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b border-slate-200 dark:border-slate-700">
                <td className="py-4 font-medium">{order._id.slice(-8)}</td>
                <td className="py-4">{order.items.length}</td>
                <td className="py-4">
                  <PremiumBadge variant="success">{order.orderStatus}</PremiumBadge>
                </td>
                <td className="py-4">{formatCurrency(order.totalAmount)}</td>
                <td className="py-4">{new Date(order.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default OrdersPage;
