// frontend/src/components/ui/Input.jsx
import { forwardRef } from 'react';
import clsx from 'clsx';

const Input = forwardRef(({ className, type = 'text', ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className={clsx(
      'w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600',
      'bg-white dark:bg-slate-900 text-slate-900 dark:text-white',
      'placeholder:text-slate-500 dark:placeholder:text-slate-400',
      'focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent',
      'transition-all',
      className
    )}
    {...props}
  />
));

Input.displayName = 'Input';
export default Input;
