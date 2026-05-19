import { motion } from 'framer-motion';
import clsx from 'clsx';

/**
 * TimerCounter Component - Animated countdown or counter display
 * @param {number} value - Current counter value
 * @param {string} label - Label text
 * @param {string} format - Format: 'default', 'time', 'percentage'
 */
const TimerCounter = ({
  value = 0,
  label = 'Counter',
  format = 'default',
}) => {
  const formatValue = () => {
    if (format === 'time') {
      const hours = Math.floor(value / 3600);
      const minutes = Math.floor((value % 3600) / 60);
      const seconds = value % 60;
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    if (format === 'percentage') {
      return `${Math.round(value)}%`;
    }

    return value;
  };

  return (
    <motion.div
      className={clsx(
        'flex flex-col items-center justify-center p-6 rounded-xl',
        'bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20',
        'border border-violet-200 dark:border-violet-700/30'
      )}
    >
      <motion.div
        key={value}
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-4xl font-bold text-violet-600 dark:text-violet-400 font-mono"
      >
        {formatValue()}
      </motion.div>

      <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
        {label}
      </p>
    </motion.div>
  );
};

export default TimerCounter;
