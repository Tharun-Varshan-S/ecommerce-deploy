import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

/**
 * Tooltip Component - Hover tooltip popup with arrow indicator
 * @param {string} content - Tooltip text
 * @param {ReactNode} children - Trigger element
 * @param {string} position - Position: 'top', 'bottom', 'left', 'right'
 */
const positionClasses = {
  top: 'bottom-full mb-2 -left-1/2 translate-x-1/2',
  bottom: 'top-full mt-2 -left-1/2 translate-x-1/2',
  left: 'right-full mr-2 top-1/2 -translate-y-1/2',
  right: 'left-full ml-2 top-1/2 -translate-y-1/2',
};

const arrowClasses = {
  top: 'top-full left-1/2 -translate-x-1/2 border-t-slate-800 dark:border-t-slate-700 border-l-transparent border-r-transparent border-b-transparent',
  bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-slate-800 dark:border-b-slate-700 border-l-transparent border-r-transparent border-t-transparent',
  left: 'left-full top-1/2 -translate-y-1/2 border-l-slate-800 dark:border-l-slate-700 border-t-transparent border-b-transparent border-r-transparent',
  right: 'right-full top-1/2 -translate-y-1/2 border-r-slate-800 dark:border-r-slate-700 border-t-transparent border-b-transparent border-l-transparent',
};

const Tooltip = ({ content, children, position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const triggerRef = useRef(null);

  return (
    <div className="relative inline-block" ref={triggerRef}>
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className={clsx(
              'absolute z-50 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap',
              'bg-slate-800 dark:bg-slate-700 text-white',
              'shadow-lg pointer-events-none',
              positionClasses[position]
            )}
            role="tooltip"
          >
            {content}
            <div
              className={clsx('absolute w-0 h-0 border-4', arrowClasses[position])}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;
