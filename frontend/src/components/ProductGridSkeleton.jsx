const ProductGridSkeleton = () => (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
    {Array.from({ length: 8 }).map((_, index) => (
      <div key={index} className="animate-pulse rounded-xl bg-white p-4 shadow-sm">
        <div className="h-40 rounded-lg bg-gray-200" />
        <div className="mt-4 h-4 rounded bg-gray-200" />
        <div className="mt-2 h-4 w-2/3 rounded bg-gray-200" />
        <div className="mt-6 h-10 rounded bg-gray-200" />
      </div>
    ))}
  </div>
);

export default ProductGridSkeleton;
