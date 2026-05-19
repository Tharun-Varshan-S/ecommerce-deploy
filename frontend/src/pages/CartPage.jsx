import { Link, useNavigate } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import QuantitySelector from "../components/QuantitySelector";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import formatCurrency from "../utils/formatCurrency";
import { Button, Input, PriceTag } from "../components/ui";

const CartPage = () => {
  const { cartItems, cartTotal, updateQuantity, removeFromCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!cartItems.length) {
    return <EmptyState title="Your cart is empty" description="Add premium products to start shopping." />;
  }

  const checkoutAction = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/checkout" } });
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        {cartItems.map((item) => (
          <div
            key={item.product._id}
            className="flex flex-col gap-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/70 p-5 shadow-sm sm:flex-row"
          >
            <img
              src={item.product.image || item.product.images?.[0]}
              alt={item.product.title || item.product.name}
              className="h-28 w-28 rounded-xl object-cover"
              loading="lazy"
            />
            <div className="flex-1">
              <Link to={`/products/${item.product._id}`} className="text-lg font-semibold text-slate-900 dark:text-white">
                {item.product.title || item.product.name}
              </Link>
              <p className="text-sm text-slate-500 dark:text-slate-400">{item.product.category}</p>
              <div className="mt-3 flex items-center justify-between">
                <PriceTag price={item.product.price} />
                <QuantitySelector
                  value={item.quantity}
                  onChange={(qty) => updateQuantity(item.product._id, qty)}
                  max={item.product.stock || 99}
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                <span>Item total</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {formatCurrency(item.product.price * item.quantity)}
                </span>
              </div>
              <button
                onClick={() => removeFromCart(item.product._id)}
                className="mt-3 text-sm font-medium text-red-500 hover:text-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <aside className="space-y-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/70 p-6 shadow-sm">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Order Summary</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Review your totals before checkout.</p>
        </div>

        <div className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center justify-between">
            <span>Subtotal</span>
            <span className="font-semibold text-slate-900 dark:text-white">{formatCurrency(cartTotal)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-700 pt-3 text-base font-semibold text-slate-900 dark:text-white">
            <span>Total</span>
            <span>{formatCurrency(cartTotal)}</span>
          </div>
        </div>

        <div>
          <label className="text-xs uppercase tracking-[0.25em] text-slate-400">Coupon Code</label>
          <Input placeholder="Enter code" className="mt-2" />
        </div>

        <div>
          <label className="text-xs uppercase tracking-[0.25em] text-slate-400">Shipping Estimate</label>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Arrives in 2-4 business days.</p>
        </div>

        <Button onClick={checkoutAction} className="w-full">
          Proceed to Checkout
        </Button>
      </aside>
    </div>
  );
};

export default CartPage;
