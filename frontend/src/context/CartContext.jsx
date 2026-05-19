import { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext(null);

const CART_KEY = "shopsphere_cart";

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState(() => JSON.parse(localStorage.getItem(CART_KEY) || "[]"));
  const [loading, setLoading] = useState(false);

  const saveGuestCart = (items) => {
    setCartItems(items);
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  };

  const syncServerCart = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/cart");
      const mapped = data.products.map((item) => ({
        product: item.product,
        quantity: item.quantity,
      }));
      setCartItems(mapped);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      syncServerCart();
    } else {
      setCartItems(JSON.parse(localStorage.getItem(CART_KEY) || "[]"));
    }
  }, [isAuthenticated]);

  const addToCart = async (product, quantity = 1) => {
    if (isAuthenticated) {
      const { data } = await api.post("/cart/add", { productId: product._id, quantity });
      setCartItems(data.products.map((item) => ({ product: item.product, quantity: item.quantity })));
      toast.success("Added to cart");
      return;
    }

    const existing = cartItems.find((item) => item.product._id === product._id);
    const updated = existing
      ? cartItems.map((item) =>
          item.product._id === product._id ? { ...item, quantity: item.quantity + quantity } : item
        )
      : [...cartItems, { product, quantity }];
    saveGuestCart(updated);
    toast.success("Added to cart");
  };

  const updateQuantity = async (productId, quantity) => {
    if (isAuthenticated) {
      const { data } = await api.put("/cart/update", { productId, quantity });
      setCartItems(data.products.map((item) => ({ product: item.product, quantity: item.quantity })));
      return;
    }
    const updated = cartItems.map((item) =>
      item.product._id === productId ? { ...item, quantity: Number(quantity) } : item
    );
    saveGuestCart(updated);
  };

  const removeFromCart = async (productId) => {
    if (isAuthenticated) {
      const { data } = await api.delete(`/cart/remove/${productId}`);
      setCartItems(data.products.map((item) => ({ product: item.product, quantity: item.quantity })));
      toast.success("Removed from cart");
      return;
    }

    const updated = cartItems.filter((item) => item.product._id !== productId);
    saveGuestCart(updated);
    toast.success("Removed from cart");
  };

  const clearCart = () => {
    saveGuestCart([]);
    setCartItems([]);
  };

  const cartCount = useMemo(() => cartItems.reduce((sum, item) => sum + item.quantity, 0), [cartItems]);
  const cartTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cartItems]
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
