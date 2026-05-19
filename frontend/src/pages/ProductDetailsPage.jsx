import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import api from "../services/api";
import useCart from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";
import QuantitySelector from "../components/QuantitySelector";
import LoadingSpinner from "../components/LoadingSpinner";
import { ProductCard, ReviewCard } from "../components/product";
import {
  Breadcrumb,
  Button,
  PriceTag,
  StarRating,
  StockIndicator,
  Tabs,
} from "../components/ui";
import { PRODUCTS } from "../data/products";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
        const similar = await api.get("/products", { params: { category: data.category } });
        setSimilarProducts(similar.data.filter((item) => item._id !== data._id).slice(0, 4));
      } catch {
        toast.error("Unable to load product details");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const enrichedProduct = useMemo(() => {
    if (!product) return null;
    const fallback = PRODUCTS.find(
      (item) => item.name?.toLowerCase() === product.title?.toLowerCase() || item._id === product._id
    );

    return {
      ...product,
      images: product.images?.length ? product.images : [product.image].filter(Boolean),
      reviews: product.reviews?.length ? product.reviews : fallback?.reviews || [],
      specifications: product.specifications || fallback?.specifications || {},
      discountPrice: product.discountPrice || fallback?.discountPrice,
    };
  }, [product]);

  if (loading) return <LoadingSpinner />;
  if (!enrichedProduct) return null;

  const images = enrichedProduct.images?.length ? enrichedProduct.images : [];
  const activeImageSrc = images[activeImage] || images[0];

  const tabs = [
    {
      id: "description",
      label: "Description",
      content: (
        <div className="prose max-w-none text-slate-700 dark:text-slate-300">
          <p>{enrichedProduct.description}</p>
        </div>
      ),
    },
    {
      id: "specs",
      label: "Specifications",
      content: (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {Object.entries(enrichedProduct.specifications || {}).map(([key, value]) => (
            <div key={key} className="rounded-xl border border-slate-200 dark:border-slate-700 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{key}</p>
              <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">{value}</p>
            </div>
          ))}
          {!Object.keys(enrichedProduct.specifications || {}).length && (
            <p className="text-sm text-slate-500 dark:text-slate-400">No specifications available.</p>
          )}
        </div>
      ),
    },
    {
      id: "reviews",
      label: "Reviews",
      content: (
        <div className="space-y-4">
          {enrichedProduct.reviews?.length ? (
            enrichedProduct.reviews.map((review, index) => (
              <ReviewCard key={`${review.author}-${index}`} review={review} />
            ))
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400">No reviews yet.</p>
          )}
        </div>
      ),
    },
    {
      id: "shipping",
      label: "Shipping",
      content: (
        <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
          <p>Free express delivery on orders over $150.</p>
          <p>Standard shipping: 2-4 business days.</p>
          <p>Premium packaging included for all orders.</p>
        </div>
      ),
    },
  ];

  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: enrichedProduct.category || "Category", path: `/search?category=${enrichedProduct.category}` },
    { label: enrichedProduct.title },
  ];

  return (
    <div className="space-y-12">
      <Breadcrumb items={breadcrumbItems} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70"
          >
            <img src={activeImageSrc} alt={enrichedProduct.title} className="h-[420px] w-full object-cover" />
          </motion.div>
          <div className="flex gap-3 overflow-x-auto">
            {images.map((src, index) => (
              <button
                key={src}
                onClick={() => setActiveImage(index)}
                className={`h-20 w-20 rounded-2xl border ${
                  activeImage === index ? "border-violet-500" : "border-slate-200 dark:border-slate-700"
                }`}
              >
                <img src={src} alt="Thumbnail" className="h-full w-full rounded-2xl object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{enrichedProduct.category}</p>
              <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                {enrichedProduct.title}
              </h1>
              <div className="mt-3 flex items-center gap-3">
                <StarRating rating={enrichedProduct.rating || 0} readonly />
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {enrichedProduct.rating}/5
                </span>
              </div>
            </div>
            <button
              onClick={() => toggleWishlist(enrichedProduct)}
              className={`rounded-full border p-3 ${
                isWishlisted(enrichedProduct._id) ? "border-pink-500 text-pink-500" : "border-slate-200 dark:border-slate-700"
              }`}
              aria-label="Wishlist"
            >
              <Heart size={18} />
            </button>
          </div>

          <PriceTag price={enrichedProduct.discountPrice || enrichedProduct.price} originalPrice={enrichedProduct.price} />
          <StockIndicator stock={enrichedProduct.stock || 0} maxStock={100} />

          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 p-4">
            <p className="text-sm text-slate-600 dark:text-slate-300">Choose quantity</p>
            <div className="mt-3 flex items-center gap-4">
              <QuantitySelector value={quantity} onChange={setQuantity} max={enrichedProduct.stock || 1} />
              <Button onClick={() => addToCart(enrichedProduct, quantity)}>Add to Cart</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 p-4 text-sm text-slate-600 dark:text-slate-300">
              Free express shipping on orders above $150.
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 p-4 text-sm text-slate-600 dark:text-slate-300">
              30-day returns. Premium packaging included.
            </div>
          </div>
        </div>
      </div>

      <Tabs tabs={tabs} defaultTab="description" />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Related Products</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {similarProducts.map((item) => (
            <ProductCard key={item._id} product={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetailsPage;
