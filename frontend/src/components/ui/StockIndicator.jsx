import clsx from 'clsx';

/**
 * StockIndicator Component - Stock level bar with status text and color coding
 * @param {number} stock - Current stock level
 * @param {number} maxStock - Maximum stock level (for bar calculation)
 */
const StockIndicator = ({ stock = 0, maxStock = 100 }) => {
  const percentage = Math.min((stock / maxStock) * 100, 100);

  const getStatus = () => {
    if (stock <= 0) return { label: 'Out of Stock', color: 'text-red-600 dark:text-red-400' };
    if (stock < maxStock * 0.2) return { label: 'Low Stock', color: 'text-amber-600 dark:text-amber-400' };
    if (stock < maxStock * 0.5) return { label: 'Limited Stock', color: 'text-orange-600 dark:text-orange-400' };
    return { label: 'In Stock', color: 'text-green-600 dark:text-green-400' };
  };

  const status = getStatus();

  const getBarColor = () => {
    if (stock <= 0) return 'from-red-500 to-red-600';
    if (stock < maxStock * 0.2) return 'from-amber-500 to-amber-600';
    if (stock < maxStock * 0.5) return 'from-orange-500 to-orange-600';
    return 'from-green-500 to-green-600';
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Stock Level
        </span>
        <span className={clsx('text-xs font-bold', status.color)}>
          {status.label}
        </span>
      </div>

      <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
        <div
          className={clsx(
            'h-full rounded-full bg-gradient-to-r transition-all duration-300',
            getBarColor()
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="text-xs text-slate-600 dark:text-slate-400">
        {stock} / {maxStock} items available
      </div>
    </div>
  );
};

export default StockIndicator;
