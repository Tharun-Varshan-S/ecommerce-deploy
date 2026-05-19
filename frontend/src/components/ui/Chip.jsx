import { motion } from 'framer-motion';
import clsx from 'clsx';

/**
 * Chip Component - Small interactive tags/badges with optional remove button
 * @param {string} label - Chip label
 * @param {function} onRemove - Callback when remove button clicked
 * @param {string} variant - Variant: 'primary', 'secondary', 'outline'
 * @param {boolean} removable - Show remove button
 * @param {ReactNode} icon - Optional icon
 */
const variantClasses = {
  primary: 'bg-gradient-to-r from-violet-500 to-indigo-600 text-white',
  secondary: 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white',
  outline: 'border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white',
};

const Chip = ({
  label,
  onRemove,
  variant = 'primary',
  removable = false,
  icon,
}) => (
  <motion.div
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.9, opacity: 0 }}
    whileHover={{ scale: 1.05 }}
    className={clsx(
      'inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium',
      'transition-all',
      variantClasses[variant]
    )}
  >
    {icon && <span className="flex-shrink-0">{icon}</span>}
    <span>{label}</span>
    {removable && (
      <button
        onClick={onRemove}
        className="ml-1 text-lg leading-none opacity-70 hover:opacity-100 transition-opacity"
        aria-label={`Remove ${label}`}
      >
        ×
      </button>
    )}
  </motion.div>
);

export default Chip;
