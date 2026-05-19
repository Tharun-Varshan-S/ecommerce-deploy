import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useCart from "../hooks/useCart";
import api from "../services/api";
import formatCurrency from "../utils/formatCurrency";
import { Button, Card, Input } from "../components/ui";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  const [form, setForm] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post("/orders", {
        items: cartItems.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
        })),
        shippingAddress: form,
      });
      clearCart();
      toast.success("Order placed successfully");
      navigate("/orders");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to place order");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <Card className="space-y-4 p-6 lg:col-span-2">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Shipping Details</h1>
        <form onSubmit={handlePlaceOrder} className="space-y-4">
          {Object.keys(form).map((field) => (
            <Input
              key={field}
              required
              placeholder={field.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}
              value={form[field]}
              onChange={(e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))}
            />
          ))}
          <Button disabled={submitting} className="w-full">
            {submitting ? "Placing order..." : "Place Order"}
          </Button>
        </form>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Order Summary</h2>
        <div className="mt-4 space-y-3">
          {cartItems.map((item) => (
            <div key={item.product._id} className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
              <span>{item.product.title}</span>
              <span>
                {item.quantity} x {formatCurrency(item.product.price)}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-6 border-t border-slate-200 dark:border-slate-700 pt-4 text-lg font-bold text-slate-900 dark:text-white">
          Total: {formatCurrency(cartTotal)}
        </div>
      </Card>
    </div>
  );
};

export default CheckoutPage;
