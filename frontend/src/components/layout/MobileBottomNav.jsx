import { Link, useLocation } from "react-router-dom";
import { Heart, Home, Search, ShoppingCart, User } from "lucide-react";
import clsx from "clsx";
import useCart from "../../hooks/useCart";
import useWishlist from "../../hooks/useWishlist";

const MobileBottomNav = () => {
  const { pathname } = useLocation();
  const { cartCount } = useCart();
  const { items } = useWishlist();

  const links = [
    { to: "/", label: "Home", icon: Home },
    { to: "/search", label: "Search", icon: Search },
    { to: "/wishlist", label: "Wishlist", icon: Heart },
    { to: "/cart", label: "Cart", icon: ShoppingCart, badge: cartCount },
    { to: "/profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-slate-950/90 backdrop-blur-xl lg:hidden">
      <div className="mx-auto flex max-w-7xl items-center justify-around py-2">
        {links.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.to;
          const badgeValue = item.label === "Wishlist" ? items.length : item.badge;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={clsx(
                "relative flex flex-col items-center gap-1 text-xs font-medium",
                active ? "text-white" : "text-slate-400"
              )}
            >
              <Icon size={18} />
              {badgeValue > 0 && (
                <span className="absolute -right-2 -top-1 rounded-full bg-violet-500 px-1.5 text-[10px] text-white">
                  {badgeValue}
                </span>
              )}
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
