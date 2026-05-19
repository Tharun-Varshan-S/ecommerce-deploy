import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";
import { ProductCard } from "../components/product";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";
import { SearchBar } from "../components/ui";
import { CATEGORIES, PRODUCTS } from "../data/products";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [sort, setSort] = useState("latest");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const suggestions = useMemo(() => PRODUCTS.map((product) => product.name || product.title), []);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      const params = {};
      if (query) params.search = query;
      if (category) params.category = category;
      const { data } = await api.get("/products", { params });
      let sorted = [...data];
      if (sort === "price-low") sorted.sort((a, b) => a.price - b.price);
      if (sort === "price-high") sorted.sort((a, b) => b.price - a.price);
      if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
      setResults(sorted);
      setLoading(false);
    };
    fetchResults();
  }, [query, category, sort]);

  const handleSearch = (value) => {
    setQuery(value);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("q", value);
      return next;
    });
  };

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/70 p-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Search Products</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Explore the entire ShopSphere catalog with smart filters.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[2fr,1fr,1fr]">
          <SearchBar onSearch={handleSearch} suggestions={suggestions} />
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setSearchParams((prev) => {
                const next = new URLSearchParams(prev);
                if (e.target.value) next.set("category", e.target.value);
                else next.delete("category");
                return next;
              });
            }}
            className="rounded-xl border border-slate-300 bg-white/80 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900/70"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.title}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-xl border border-slate-300 bg-white/80 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900/70"
          >
            <option value="latest">Latest</option>
            <option value="rating">Top Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : results.length ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <EmptyState title="No products found" description="Try adjusting your search or filters." />
      )}
    </div>
  );
};

export default SearchPage;
