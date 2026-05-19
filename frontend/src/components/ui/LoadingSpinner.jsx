import { motion } from 'framer-motion';
import clsx from 'clsx';

/**
 * LoadingSpinner Component - Animated spinner circle with Framer Motion
 * @param {string} size - Size: 'sm', 'md', 'lg'
 * @param {string} color - Color: 'primary' (violet), 'white', 'slate'
 */
const sizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

const colorClasses = {
  primary: 'text-violet-500',
  white: 'text-white',
  slate: 'text-slate-400',
};

const LoadingSpinner = ({ size = 'md', color = 'primary' }) => (
  <div
    className={clsx(sizeClasses[size], 'flex items-center justify-center')}
    role="status"
    aria-label="Loading"
  >
    <motion.svg
      className={clsx('fill-current', colorClasses[color])}
      viewBox="0 0 24 24"
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <circle cx="12" cy="12" r="10" opacity="0.25" />
      <path
        d="M12 2a10 10 0 0110 10"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
      />
    </motion.svg>
  </div>
);

export default LoadingSpinner;
