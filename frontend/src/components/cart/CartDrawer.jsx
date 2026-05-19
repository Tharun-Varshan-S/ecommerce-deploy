import { Link, useNavigate } from "react-router-dom";
import Drawer from "../ui/Drawer";
import EmptyState from "../EmptyState";
import QuantitySelector from "../QuantitySelector";
import useCart from "../../hooks/useCart";
import formatCurrency from "../../utils/formatCurrency";

const CartDrawer = ({ isOpen, onClose }) => {
  const { cartItems, cartTotal, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const goToCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} side="right" width="lg">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Your Cart</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {cartItems.length} items • {formatCurrency(cartTotal)}
          </p>
        </div>

        {!cartItems.length ? (
          <EmptyState
            title="Your cart is empty"
            description="Explore premium products and add them to your cart."
          />
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.product._id}
                className="flex items-center gap-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 p-4"
              >
                <img
                  src={item.product.image || item.product.images?.[0]}
                  alt={item.product.title || item.product.name}
                  className="h-16 w-16 rounded-lg object-cover"
                  loading="lazy"
                />
                <div className="flex-1">
                  <Link
                    to={`/products/${item.product._id}`}
                    onClick={onClose}
                    className="font-medium text-slate-900 dark:text-white"
                  >
                    {item.product.title || item.product.name}
                  </Link>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{item.product.category}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <QuantitySelector
                      value={item.quantity}
                      onChange={(qty) => updateQuantity(item.product._id, qty)}
                      max={item.product.stock || 99}
                    />
                    <button
                      onClick={() => removeFromCart(item.product._id)}
                      className="text-xs font-semibold text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white">
                  {formatCurrency(item.product.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-3 border-t border-slate-200 dark:border-slate-700 pt-4">
          <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
            <span>Subtotal</span>
            <span>{formatCurrency(cartTotal)}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex items-center justify-between text-lg font-semibold text-slate-900 dark:text-white">
            <span>Total</span>
            <span>{formatCurrency(cartTotal)}</span>
          </div>
          <button
            onClick={goToCheckout}
            disabled={!cartItems.length}
            className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-3 font-semibold text-white shadow-lg hover:from-violet-700 hover:to-indigo-700 disabled:opacity-50"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </Drawer>
  );
};

export default CartDrawer;
