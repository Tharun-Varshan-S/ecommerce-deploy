import { createContext, useMemo, useState } from "react";
import toast from "react-hot-toast";

export const WishlistContext = createContext(null);

const WISHLIST_KEY = "shopsphere_wishlist";

export const WishlistProvider = ({ children }) => {
  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]"));

  const persist = (next) => {
    setItems(next);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(next));
  };

  const addToWishlist = (product) => {
    if (!product) return;
    if (items.some((item) => item._id === product._id)) return;
    persist([product, ...items]);
    toast.success("Added to wishlist");
  };

  const removeFromWishlist = (productId) => {
    const updated = items.filter((item) => item._id !== productId);
    persist(updated);
    toast.success("Removed from wishlist");
  };

  const toggleWishlist = (product) => {
    if (!product?._id) return;
    if (items.some((item) => item._id === product._id)) {
      removeFromWishlist(product._id);
      return;
    }
    addToWishlist(product);
  };

  const isWishlisted = (productId) => items.some((item) => item._id === productId);

  const value = useMemo(
    () => ({
      items,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      isWishlisted,
    }),
    [items]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};
