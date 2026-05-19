import clsx from 'clsx';
import { ChevronRight } from 'lucide-react';

/**
 * Breadcrumb Component - Navigation path with clickable links
 * @param {array} items - Breadcrumb items: { label, path?, onClick? }
 */
const Breadcrumb = ({ items = [] }) => (
  <nav className="flex items-center gap-2" aria-label="Breadcrumb">
    {items.map((item, index) => {
      const isLast = index === items.length - 1;

      return (
        <div key={index} className="flex items-center gap-2">
          {index > 0 && (
            <ChevronRight
              size={16}
              className="text-slate-400 dark:text-slate-500 flex-shrink-0"
            />
          )}

          {isLast ? (
            <span
              className="text-sm font-medium text-slate-600 dark:text-slate-400"
              aria-current="page"
            >
              {item.label}
            </span>
          ) : (
            <button
              onClick={item.onClick}
              className={clsx(
                'text-sm font-medium transition-colors',
                'text-slate-600 dark:text-slate-400',
                'hover:text-violet-600 dark:hover:text-violet-400',
                item.onClick && 'cursor-pointer'
              )}
            >
              {item.label}
            </button>
          )}
        </div>
      );
    })}
  </nav>
);

export default Breadcrumb;
