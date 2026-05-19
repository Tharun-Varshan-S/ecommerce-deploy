import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';

/**
 * Accordion Component - Expandable accordion items with smooth animations
 * @param {array} items - Accordion items: { id, title, content }
 * @param {string} activeId - Currently active item id
 * @param {function} onChange - Callback when item changes
 * @param {boolean} allowMultiple - Allow multiple items open simultaneously
 */
const Accordion = ({
  items = [],
  activeId,
  onChange,
  allowMultiple = false,
}) => {
  const [openItems, setOpenItems] = useState(activeId ? [activeId] : []);

  const handleToggle = (id) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenItems((prev) => (prev.includes(id) ? [] : [id]));
    }
    onChange?.(id);
  };

  return (
    <div className="space-y-2">
      {items.map((item) => {
        const isOpen = openItems.includes(item.id);

        return (
          <div
            key={item.id}
            className={clsx(
              'rounded-lg border border-slate-200 dark:border-slate-700',
              'overflow-hidden transition-all',
              isOpen && 'shadow-md'
            )}
          >
            <button
              onClick={() => handleToggle(item.id)}
              className={clsx(
                'w-full px-4 py-4 flex items-center justify-between',
                'bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800',
                'transition-colors text-left'
              )}
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${item.id}`}
            >
              <h3 className="font-semibold text-slate-900 dark:text-white">
                {item.title}
              </h3>

              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0"
              >
                <ChevronDown
                  size={20}
                  className="text-slate-600 dark:text-slate-400"
                />
              </motion.div>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  id={`accordion-panel-${item.id}`}
                  role="region"
                  className="border-t border-slate-200 dark:border-slate-700"
                >
                  <div className="px-4 py-4 bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
