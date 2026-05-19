import { motion } from 'framer-motion';
import clsx from 'clsx';

/**
 * ProgressBar Component - Progress visualization with percentage
 * @param {number} progress - Progress value (0-100)
 * @param {string} color - Color variant: 'primary', 'success', 'warning', 'error'
 * @param {string} label - Label text
 * @param {boolean} showPercent - Show percentage text
 */
const colorClasses = {
  primary: 'from-violet-500 to-indigo-600',
  success: 'from-green-500 to-emerald-600',
  warning: 'from-amber-500 to-orange-600',
  error: 'from-red-500 to-rose-600',
};

const ProgressBar = ({
  progress = 0,
  color = 'primary',
  label,
  showPercent = true,
}) => {
  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <div className="w-full space-y-1.5">
      {(label || showPercent) && (
        <div className="flex items-center justify-between">
          {label && (
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {label}
            </span>
          )}
          {showPercent && (
            <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
              {clampedProgress}%
            </span>
          )}
        </div>
      )}

      <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${clampedProgress}%` }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className={clsx(
            'h-full rounded-full bg-gradient-to-r',
            colorClasses[color]
          )}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
