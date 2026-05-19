// frontend/src/components/ui/Card.jsx
import { motion } from 'framer-motion';
import clsx from 'clsx';

const Card = ({ className, children, hoverable = false, ...props }) => (
  <motion.div
    whileHover={hoverable ? { y: -4 } : undefined}
    className={clsx(
      'rounded-2xl border border-slate-200 dark:border-slate-700',
      'bg-white dark:bg-slate-900 backdrop-blur-xl',
      'shadow-sm hover:shadow-lg transition-shadow',
      hoverable && 'cursor-pointer',
      className
    )}
    {...props}
  >
    {children}
  </motion.div>
);

export default Card;
