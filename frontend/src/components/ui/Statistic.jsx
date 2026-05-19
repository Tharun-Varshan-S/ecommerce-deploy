import { motion } from 'framer-motion';
import clsx from 'clsx';

/**
 * Statistic Component - Display key metrics and stats with animations
 * @param {string} value - Main value to display
 * @param {string} label - Label text
 * @param {string} unit - Optional unit (%, $, etc)
 * @param {boolean} trend - Show trend indicator
 * @param {number} trendValue - Trend percentage
 * @param {string} trendDirection - 'up', 'down', 'neutral'
 */
const Statistic = ({
  value,
  label,
  unit,
  trend = false,
  trendValue = 0,
  trendDirection = 'neutral',
}) => {
  const trendColor = {
    up: 'text-green-600 dark:text-green-400',
    down: 'text-red-600 dark:text-red-400',
    neutral: 'text-slate-600 dark:text-slate-400',
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={clsx(
        'p-4 rounded-xl',
        'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700',
        'shadow-sm hover:shadow-md transition-all'
      )}
    >
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
        {label}
      </p>

      <div className="flex items-baseline justify-between mb-2">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-baseline"
        >
          <span className="text-3xl font-bold text-slate-900 dark:text-white">
            {value}
          </span>
          {unit && (
            <span className="text-lg text-slate-600 dark:text-slate-400 ml-1">
              {unit}
            </span>
          )}
        </motion.div>
      </div>

      {trend && trendValue !== 0 && (
        <div className={clsx('text-xs font-semibold flex items-center gap-1', trendColor[trendDirection])}>
          <span>{trendDirection === 'up' ? '↑' : '↓'}</span>
          <span>{Math.abs(trendValue)}%</span>
        </div>
      )}
    </motion.div>
  );
};

export default Statistic;
