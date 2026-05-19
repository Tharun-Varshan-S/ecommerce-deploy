import clsx from 'clsx';

/**
 * PriceTag Component - Display current and original price with discount badge
 * @param {number} price - Current price
 * @param {number} originalPrice - Original price (optional)
 */
const PriceTag = ({ price, originalPrice }) => {
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <div className="flex items-baseline gap-2">
      <span className="text-2xl font-bold text-violet-600 dark:text-violet-400">
        ${price.toFixed(2)}
      </span>

      {originalPrice && (
        <>
          <span className="text-sm line-through text-slate-500 dark:text-slate-400">
            ${originalPrice.toFixed(2)}
          </span>

          {discount > 0 && (
            <span
              className={clsx(
                'ml-1 px-2 py-0.5 rounded-full text-xs font-bold',
                'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
              )}
            >
              -{discount}%
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default PriceTag;
