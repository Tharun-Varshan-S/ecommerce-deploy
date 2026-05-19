import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Heart, Eye } from 'lucide-react';
import clsx from 'clsx';
import StarRating from '../ui/StarRating';
import PriceTag from '../ui/PriceTag';
import StockIndicator from '../ui/StockIndicator';
import useCart from '../../hooks/useCart';
import useWishlist from '../../hooks/useWishlist';

/**
 * ProductCard Component - Premium product display with hover effects
 * @param {object} product - Product data: { image, name, price, originalPrice, rating, stock, discount }
 * @param {function} onAddCart - Callback for add to cart
 * @param {function} onWishlist - Callback for wishlist toggle
 * @param {function} onQuickView - Callback for quick view modal
 */
const ProductCard = ({ product, onAddCart, onWishlist, onQuickView }) => {
  const { addToCart } = useCart();
  const wishlist = useWishlist();

  const normalized = useMemo(() => {
    const title = product?.title || product?.name || 'Untitled Product';
    const image = product?.image || product?.images?.[0] || 'https://placehold.co/600x400?text=ShopSphere';
    const price = Number(product?.price ?? 0);
    const discountPrice = Number(product?.discountPrice ?? 0);
    const currentPrice = discountPrice > 0 ? discountPrice : price;
    const originalPrice = discountPrice > 0 ? price : product?.originalPrice;
    const discount =
      product?.discount ??
      (discountPrice > 0 && price > 0 ? Math.round((1 - currentPrice / price) * 100) : null);

    return {
      id: product?._id || product?.id || product?.slug,
      title,
      image,
      category: product?.category || 'Category',
      rating: Number(product?.rating ?? 0),
      stock: Number(product?.stock ?? 0),
      currentPrice,
      originalPrice,
      discount,
    };
  }, [product]);

  const isWishlisted = wishlist?.isWishlisted?.(normalized.id);

  const handleWishlist = (e) => {
    e.stopPropagation();
    if (onWishlist) {
      onWishlist(product);
      return;
    }
    wishlist?.toggleWishlist?.(product);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    onQuickView?.(product);
  };

  const handleAddToCart = () => {
    if (onAddCart) {
      onAddCart(product);
      return;
    }
    addToCart(product, 1);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', damping: 15, stiffness: 300 }}
      className="group"
    >
      <div
        className={clsx(
          'relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700',
          'bg-white dark:bg-slate-900 shadow-sm hover:shadow-2xl transition-all cursor-pointer'
        )}
      >
        <div className="relative overflow-hidden h-48 bg-slate-100 dark:bg-slate-800">
          <img
            src={normalized.image}
            alt={normalized.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />

          <div
            className={clsx(
              'absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity',
              'flex items-center justify-center gap-2'
            )}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={handleQuickView}
              className={clsx(
                'flex items-center justify-center w-10 h-10 rounded-full',
                'bg-white text-violet-600 hover:bg-violet-50',
                'transition-all shadow-lg'
              )}
              aria-label="Quick view"
            >
              <Eye size={18} />
            </motion.button>
          </div>

          {normalized.discount ? (
            <div className="absolute top-2 right-2 px-3 py-1 rounded-full bg-red-500 text-white text-xs font-bold">
              -{normalized.discount}%
            </div>
          ) : null}

          <motion.button
            whileHover={{ scale: 1.2 }}
            onClick={handleWishlist}
            className={clsx(
              'absolute top-2 left-2 p-2 rounded-full transition-all',
              isWishlisted
                ? 'bg-red-500 text-white'
                : 'bg-white/80 text-slate-600 hover:bg-white hover:text-red-500'
            )}
            aria-label="Add to wishlist"
          >
            <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
          </motion.button>
        </div>

        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-2">
              {normalized.title}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              {normalized.category}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <PriceTag price={normalized.currentPrice} originalPrice={normalized.originalPrice} />
            <StarRating rating={normalized.rating} readonly size="sm" />
          </div>

          <StockIndicator stock={normalized.stock} maxStock={100} />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            className={clsx(
              'w-full py-2.5 rounded-lg font-semibold transition-all',
              'bg-gradient-to-r from-violet-600 to-indigo-600',
              'text-white hover:from-violet-700 hover:to-indigo-700',
              'hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'
            )}
            disabled={!normalized.stock || normalized.stock <= 0}
          >
            {normalized.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
