// frontend/src/components/ui/Badge.jsx
import clsx from 'clsx';

const Badge = ({ variant = 'default', children, className }) => (
  <span
    className={clsx(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      {
        'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100': variant === 'default',
        'bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-100': variant === 'success',
        'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-100': variant === 'warning',
        'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100': variant === 'error',
        'bg-violet-100 dark:bg-violet-900 text-violet-800 dark:text-violet-100': variant === 'primary',
      },
      className
    )}
  >
    {children}
  </span>
);

export default Badge;
