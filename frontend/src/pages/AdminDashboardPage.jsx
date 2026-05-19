import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import api from "../services/api";
import { Button, Card, Input, PremiumBadge, Statistic } from "../components/ui";

const defaultProduct = {
  title: "",
  description: "",
  image: "",
  price: 0,
  category: "electronics",
  stock: 0,
  rating: 4,
};

const AdminDashboardPage = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(defaultProduct);
  const [editingId, setEditingId] = useState(null);

  const loadDashboard = async () => {
    const [productRes, orderRes, userRes] = await Promise.all([
      api.get("/products"),
      api.get("/admin/orders"),
      api.get("/admin/users"),
    ]);
    setProducts(productRes.data);
    setOrders(orderRes.data);
    setUsers(userRes.data);
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const submitProduct = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/products/${editingId}`, form);
        toast.success("Product updated");
      } else {
        await api.post("/products", form);
        toast.success("Product added");
      }
      setForm(defaultProduct);
      setEditingId(null);
      loadDashboard();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save product");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      toast.success("Product deleted");
      loadDashboard();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  const revenue = useMemo(
    () => orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0),
    [orders]
  );

  const salesData = useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    return months.map((label, idx) => ({
      name: label,
      sales: orders
        .filter((order) => new Date(order.createdAt).getMonth() === idx)
        .reduce((sum, order) => sum + (order.totalAmount || 0), 0),
    }));
  }, [orders]);

  const categoryData = useMemo(() => {
    const counts = products.reduce((acc, product) => {
      const key = product.category || "other";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [products]);

  const inventoryData = useMemo(() => {
    return products.slice(0, 6).map((product) => ({
      name: product.title,
      stock: product.stock,
    }));
  }, [products]);

  const colors = ["#7C3AED", "#06B6D4", "#F97316", "#22C55E", "#EF4444", "#F59E0B"];

  return (
    <div className="space-y-10">
      <section className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold">Admin Analytics</h1>
        <p className="mt-2 text-sm text-slate-300">Monitor revenue, orders, users, and inventory in real time.</p>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <Statistic label="Total Revenue" value={`$${revenue.toFixed(2)}`} change="+12%" />
        <Statistic label="Orders" value={`${orders.length}`} change="+7%" />
        <Statistic label="Users" value={`${users.length}`} change="+4%" />
        <Statistic label="Inventory" value={`${products.reduce((sum, p) => sum + (p.stock || 0), 0)}`} change="-2%" />
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Sales Trend</h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#7C3AED" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Category Mix</h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} dataKey="value" nameKey="name" outerRadius={90}>
                  {categoryData.map((entry, index) => (
                    <Cell key={entry.name} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Inventory Snapshot</h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={inventoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" hide />
                <YAxis stroke="#94A3B8" />
                <Tooltip />
                <Bar dataKey="stock" fill="#06B6D4" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Recent Orders</h2>
          <div className="mt-4 space-y-3">
            {orders.slice(0, 4).map((order) => (
              <div key={order._id} className="rounded-xl border border-slate-200 dark:border-slate-700 p-3">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {order.userId?.name || "Unknown"}
                </p>
                <p className="text-xs text-slate-500">{order.items.length} items</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm font-semibold">${order.totalAmount.toFixed(2)}</span>
                  <PremiumBadge variant="success">{order.orderStatus}</PremiumBadge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/70 p-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          {editingId ? "Edit Product" : "Add Product"}
        </h2>
        <form onSubmit={submitProduct} className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {Object.keys(form).map((field) =>
            field === "category" ? (
              <select
                key={field}
                value={form[field]}
                onChange={(e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))}
                className="rounded-lg border border-slate-300 bg-white/80 px-3 py-2 dark:border-slate-700 dark:bg-slate-900/70"
              >
                <option value="electronics">Electronics</option>
                <option value="fashion">Fashion</option>
                <option value="gaming">Gaming</option>
                <option value="shoes">Shoes</option>
                <option value="accessories">Accessories</option>
                <option value="home-decor">Home Decor</option>
                <option value="books">Books</option>
              </select>
            ) : (
              <Input
                key={field}
                required={field !== "rating"}
                type={["price", "stock", "rating"].includes(field) ? "number" : "text"}
                value={form[field]}
                placeholder={field}
                onChange={(e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))}
                className={field === "description" ? "sm:col-span-2" : ""}
              />
            )
          )}
          <div className="flex gap-2 sm:col-span-2">
            <Button type="submit">{editingId ? "Update Product" : "Add Product"}</Button>
            {editingId && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditingId(null);
                  setForm(defaultProduct);
                }}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </section>

      <section className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/70 p-6">
        <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">Product Inventory</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead className="border-b text-left text-slate-500">
              <tr>
                <th className="py-3">Title</th>
                <th className="py-3">Category</th>
                <th className="py-3">Price</th>
                <th className="py-3">Stock</th>
                <th className="py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b border-slate-200 dark:border-slate-700">
                  <td className="py-3">{product.title}</td>
                  <td className="py-3 capitalize">{product.category}</td>
                  <td className="py-3">${product.price}</td>
                  <td className="py-3">{product.stock}</td>
                  <td className="flex gap-2 py-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingId(product._id);
                        setForm(product);
                      }}
                    >
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => deleteProduct(product._id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboardPage;
