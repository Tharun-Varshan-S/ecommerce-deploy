const SearchFilterBar = ({ search, setSearch, category, setCategory }) => (
  <div className="mb-8 grid grid-cols-1 gap-4 rounded-xl bg-white p-4 shadow-sm sm:grid-cols-3">
    <input
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search products..."
      className="rounded-lg border border-gray-300 px-3 py-2 outline-none transition focus:border-accent"
    />
    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="rounded-lg border border-gray-300 px-3 py-2 outline-none transition focus:border-accent"
    >
      <option value="">All Categories</option>
      <option value="electronics">Electronics</option>
      <option value="fashion">Fashion</option>
      <option value="shoes">Shoes</option>
      <option value="accessories">Accessories</option>
    </select>
    <button onClick={() => { setSearch(""); setCategory(""); }} className="rounded-lg bg-primary px-4 py-2 text-white">
      Reset Filters
    </button>
  </div>
);

export default SearchFilterBar;
