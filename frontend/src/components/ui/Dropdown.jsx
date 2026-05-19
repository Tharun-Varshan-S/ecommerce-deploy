import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';

/**
 * Dropdown Component - Menu button with dropdown items and dividers
 * @param {ReactNode} trigger - Button/trigger element
 * @param {array} items - Menu items: { label, onClick, divider?, icon?, disabled? }
 * @param {function} onSelect - Callback when item is selected
 */
const Dropdown = ({ trigger, items = [], onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleItemClick = (item) => {
    if (!item.disabled) {
      item.onClick?.();
      onSelect?.(item);
      setIsOpen(false);
    }
  };

  return (
    <div ref={menuRef} className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'inline-flex items-center justify-center rounded-lg px-4 py-2 font-medium transition-all',
          'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white',
          'hover:bg-slate-200 dark:hover:bg-slate-700',
          'disabled:opacity-50 disabled:cursor-not-allowed'
        )}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {typeof trigger === 'string' ? (
          <>
            {trigger}
            <ChevronDown size={16} className="ml-2" />
          </>
        ) : (
          trigger
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -8 }}
            transition={{ duration: 0.15 }}
            className={clsx(
              'absolute right-0 mt-2 z-40 min-w-48 rounded-lg',
              'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700',
              'shadow-xl overflow-hidden'
            )}
            role="menu"
          >
            {items.map((item, idx) => {
              if (item.divider) {
                return (
                  <div
                    key={`divider-${idx}`}
                    className="border-b border-slate-200 dark:border-slate-700"
                  />
                );
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleItemClick(item)}
                  disabled={item.disabled}
                  className={clsx(
                    'w-full text-left px-4 py-2.5 transition-colors flex items-center gap-3',
                    item.disabled
                      ? 'text-slate-400 dark:text-slate-600 cursor-not-allowed'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  )}
                  role="menuitem"
                >
                  {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
