import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";
import formatCurrency from "../utils/formatCurrency";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <Link to={`/products/${product._id}`} className="block overflow-hidden">
        <img src={product.image} alt={product.title} className="h-48 w-full object-cover transition group-hover:scale-105" />
      </Link>
      <div className="space-y-3 p-4">
        <p className="text-xs uppercase tracking-wider text-gray-500">{product.category}</p>
        <Link to={`/products/${product._id}`} className="line-clamp-2 block text-lg font-semibold text-gray-900">
          {product.title}
        </Link>
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-accent">{formatCurrency(product.price)}</p>
          <p className="text-sm text-gray-500">⭐ {product.rating}</p>
        </div>
        <button
          onClick={() => addToCart(product, 1)}
          className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-black"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
