import { motion } from 'framer-motion';
import clsx from 'clsx';

/**
 * Badge Component - Status and label indicators
 * @param {string} label - Badge text
 * @param {string} variant - Badge style: 'primary', 'secondary', 'success', 'warning', 'error', 'info'
 * @param {string} size - Size: 'sm', 'md', 'lg'
 */
const variantClasses = {
  primary: 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300',
  secondary: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
  success: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
  warning: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
  error: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
  info: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
};

const sizeClasses = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-2.5 py-1.5 text-sm',
  lg: 'px-3 py-2 text-base',
};

const PremiumBadge = ({
  label,
  variant = 'primary',
  size = 'md',
  animated = true,
}) => (
  <motion.span
    whileHover={animated ? { scale: 1.05 } : undefined}
    className={clsx(
      'inline-flex items-center justify-center rounded-full font-semibold',
      'transition-all',
      variantClasses[variant],
      sizeClasses[size]
    )}
  >
    {label}
  </motion.span>
);

export default PremiumBadge;
