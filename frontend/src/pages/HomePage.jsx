import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Headphones, ShieldCheck, Truck, Star } from "lucide-react";
import toast from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import api from "../services/api";
import { HeroSection, FeatureCard, TestimonialCard } from "../components/layout";
import { ProductCard, CategoryCard } from "../components/product";
import { Button, Skeleton } from "../components/ui";
import { CATEGORIES, TESTIMONIALS } from "../data/products";

const HomePage = () => {
  const navigate = useNavigate();
  const [catalog, setCatalog] = useState([]);
  const [loading, setLoading] = useState(true);

  const featuredProducts = useMemo(
    () => catalog.filter((product) => product.featured).slice(0, 6),
    [catalog]
  );

  const trendingProducts = useMemo(
    () => catalog.filter((product) => product.trending).slice(0, 4),
    [catalog]
  );

  const latestProducts = useMemo(() => catalog.slice(0, 8), [catalog]);

  useEffect(() => {
    const fetchLatest = async () => {
      setLoading(true);
      try {
        const { data } = await api.get("/products");
        setCatalog(data);
      } finally {
        setLoading(false);
      }
    };
    fetchLatest();
  }, []);

  return (
    <div className="space-y-20">
      <HeroSection
        title="ShopSphere Pro"
        description="A premium commerce experience inspired by the best SaaS products. Discover curated collections with lightning-fast checkout and elegant design."
        buttonText="Shop Now"
        onButtonClick={() => navigate("/search")}
      />

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {[
          { icon: <Truck size={20} />, title: "Fast Shipping", description: "Get delivery in 48 hours across major cities." },
          { icon: <ShieldCheck size={20} />, title: "Secure Checkout", description: "256-bit encryption for every transaction." },
          { icon: <Star size={20} />, title: "Premium Quality", description: "Handpicked products from trusted brands." },
          { icon: <Headphones size={20} />, title: "24/7 Support", description: "Chat with experts anytime, anywhere." },
        ].map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Featured</p>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Featured Products</h2>
          </div>
          <Button variant="outline" onClick={() => navigate("/search")}>
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Categories</p>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Browse by Category</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((category, index) => (
            <CategoryCard
              key={category.value}
              category={{ name: category.title, image: category.image, productCount: category.count, index }}
              onClick={() => navigate(`/search?category=${encodeURIComponent(category.value)}`)}
            />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Trending</p>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Trending Right Now</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trendingProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Latest Arrivals</p>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">New in Store</h2>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-72 rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {latestProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      <section className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Testimonials</p>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">What Customers Say</h2>
        </div>
        <Swiper
          modules={[Autoplay, Navigation]}
          slidesPerView={1}
          spaceBetween={20}
          autoplay={{ delay: 3500 }}
          navigation
          breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
        >
          {TESTIMONIALS.map((testimonial) => (
            <SwiperSlide key={testimonial.author}>
              <TestimonialCard testimonial={testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 p-10 text-white">
        <div className="absolute inset-0 opacity-30">
          <motion.div
            animate={{ x: [0, 80, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute left-0 top-0 h-40 w-40 rounded-full bg-white/20 blur-3xl"
          />
        </div>
        <div className="relative z-10 grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr,1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/70">Newsletter</p>
            <h2 className="mt-2 text-3xl font-bold">Subscribe for exclusive deals</h2>
            <p className="mt-3 text-white/80">
              Get early access to new drops, private sales, and premium member-only perks.
            </p>
          </div>
          <form
            className="flex flex-col gap-3 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Thanks for subscribing!");
            }}
          >
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="flex-1 rounded-2xl px-4 py-3 text-slate-900 focus:outline-none"
            />
            <Button type="submit" variant="secondary">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
