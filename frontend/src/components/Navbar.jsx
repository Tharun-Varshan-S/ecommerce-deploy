import { useMemo, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Menu, ShoppingCart, User } from "lucide-react";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";
import { CATEGORIES, PRODUCTS } from "../data/products";
import { Dropdown, SearchBar, ThemeToggle } from "./ui";
import CartDrawer from "./cart/CartDrawer";

const linkStyles = ({ isActive }) =>
  `text-sm font-medium transition ${
    isActive ? "text-white" : "text-slate-200 hover:text-white"
  }`;

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount } = useCart();
  const { items: wishlistItems } = useWishlist();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();

  const suggestions = useMemo(() => PRODUCTS.map((product) => product.name || product.title), []);

  const categoryItems = useMemo(
    () =>
      CATEGORIES.map((category) => ({
        label: category.title,
        onClick: () => navigate(`/search?category=${encodeURIComponent(category.value)}`),
      })),
    [navigate]
  );

  const userMenuItems = useMemo(
    () => [
      { label: "Profile", onClick: () => navigate("/profile") },
      { label: "Orders", onClick: () => navigate("/orders") },
      ...(user?.isAdmin ? [{ label: "Admin Dashboard", onClick: () => navigate("/admin") }] : []),
      { divider: true },
      { label: "Logout", onClick: logout },
    ],
    [navigate, logout, user]
  );

  const guestMenuItems = useMemo(
    () => [
      { label: "Login", onClick: () => navigate("/login") },
      { label: "Register", onClick: () => navigate("/register") },
    ],
    [navigate]
  );

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileOpen(true)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-white hover:bg-white/10 sm:hidden"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
          <Link to="/" className="text-xl font-bold text-white">
            ShopSphere
          </Link>
        </div>

        <div className="hidden flex-1 items-center justify-center px-6 lg:flex">
          <SearchBar onSearch={(value) => navigate(`/search?q=${encodeURIComponent(value)}`)} suggestions={suggestions} />
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <Dropdown trigger="Categories" items={categoryItems} />
          <NavLink to="/" className={linkStyles}>
            Home
          </NavLink>
          <NavLink to="/search" className={linkStyles}>
            Search
          </NavLink>
          <NavLink to="/wishlist" className={linkStyles}>
            Wishlist
          </NavLink>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/wishlist")}
            className="relative rounded-full p-2 text-white hover:bg-white/10"
            aria-label="Wishlist"
          >
            <Heart size={18} />
            {wishlistItems.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-xs font-semibold text-white">
                {wishlistItems.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setCartOpen(true)}
            className="relative rounded-full p-2 text-white hover:bg-white/10"
            aria-label="Cart"
          >
            <ShoppingCart size={18} />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-violet-500 text-xs font-semibold text-white">
                {cartCount}
              </span>
            )}
          </button>

          <Dropdown
            trigger={
              <span className="flex items-center gap-2 text-white">
                <User size={18} />
                <span className="hidden text-sm font-medium lg:inline">
                  {isAuthenticated ? user?.name?.split(" ")[0] : "Account"}
                </span>
              </span>
            }
            items={isAuthenticated ? userMenuItems : guestMenuItems}
          />

          <ThemeToggle />
        </div>
      </nav>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition ${
          mobileOpen ? "block" : "hidden"
        }`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />
      <motion.div
        initial={{ x: -260 }}
        animate={{ x: mobileOpen ? 0 : -260 }}
        transition={{ type: "spring", damping: 20, stiffness: 240 }}
        className="fixed left-0 top-0 z-50 h-full w-64 bg-slate-950 text-white shadow-2xl lg:hidden"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
          <span className="text-lg font-semibold">Menu</span>
          <button onClick={() => setMobileOpen(false)} className="rounded-md p-1 hover:bg-white/10">
            ✕
          </button>
        </div>
        <div className="space-y-4 px-4 py-6">
          <SearchBar onSearch={(value) => navigate(`/search?q=${encodeURIComponent(value)}`)} suggestions={suggestions} />
          <div className="space-y-2">
            <NavLink to="/" className={linkStyles} onClick={() => setMobileOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/search" className={linkStyles} onClick={() => setMobileOpen(false)}>
              Search
            </NavLink>
            <NavLink to="/wishlist" className={linkStyles} onClick={() => setMobileOpen(false)}>
              Wishlist
            </NavLink>
            <NavLink to="/cart" className={linkStyles} onClick={() => setMobileOpen(false)}>
              Cart
            </NavLink>
          </div>
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Categories</p>
            {CATEGORIES.map((category) => (
              <button
                key={category.value}
                onClick={() => {
                  navigate(`/search?category=${encodeURIComponent(category.value)}`);
                  setMobileOpen(false);
                }}
                className="block text-left text-sm text-slate-200 hover:text-white"
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </header>
  );
};

export default Navbar;
