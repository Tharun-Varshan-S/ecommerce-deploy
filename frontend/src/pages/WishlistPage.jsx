import { useNavigate } from "react-router-dom";
import useWishlist from "../hooks/useWishlist";
import { ProductCard } from "../components/product";
import EmptyState from "../components/EmptyState";
import { Button } from "../components/ui";

const WishlistPage = () => {
  const navigate = useNavigate();
  const { items, removeFromWishlist } = useWishlist();

  if (!items.length) {
    return (
      <EmptyState
        title="Your wishlist is empty"
        description="Save products to your wishlist to revisit them later."
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Wishlist</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {items.length} items saved for later.
          </p>
        </div>
        <Button variant="outline" onClick={() => navigate("/search")}>
          Continue Shopping
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onWishlist={() => removeFromWishlist(product._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
