// frontend/src/components/ui/Button.jsx
import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const buttonVariants = {
  primary: 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white',
  secondary: 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700',
  outline: 'border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-900',
  ghost: 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800',
};

const sizeVariants = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

const Button = forwardRef(({ variant = 'primary', size = 'md', className, children, ...props }, ref) => (
  <motion.button
    ref={ref}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={clsx(
      'inline-flex items-center justify-center rounded-2xl font-medium transition-all',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      buttonVariants[variant],
      sizeVariants[size],
      className
    )}
    {...props}
  >
    {children}
  </motion.button>
));

Button.displayName = 'Button';
export default Button;
