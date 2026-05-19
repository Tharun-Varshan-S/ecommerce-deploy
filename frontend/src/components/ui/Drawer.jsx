import { forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { X } from 'lucide-react';

/**
 * Drawer Component - Slide-in side panel with backdrop blur overlay
 * @param {boolean} isOpen - Controls drawer visibility
 * @param {function} onClose - Callback when drawer closes
 * @param {ReactNode} children - Drawer content
 * @param {string} side - Slide direction: 'left' or 'right'
 * @param {string} width - Drawer width: 'sm', 'md', 'lg', 'xl'
 */
const widthClasses = {
  sm: 'w-64',
  md: 'w-80',
  lg: 'w-96',
  xl: 'w-[28rem]',
};

const slideVariants = {
  left: {
    initial: { x: -400, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -400, opacity: 0 },
  },
  right: {
    initial: { x: 400, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 400, opacity: 0 },
  },
};

const Drawer = forwardRef(
  ({ isOpen, onClose, children, side = 'right', width = 'md' }, ref) => {
    const slideDir = slideVariants[side] || slideVariants.right;

    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              aria-hidden="true"
            />
            <motion.div
              ref={ref}
              initial={slideDir.initial}
              animate={slideDir.animate}
              exit={slideDir.exit}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className={clsx(
                'fixed top-0 z-50 h-full',
                'rounded-r-2xl border border-slate-200 dark:border-slate-700',
                'bg-white dark:bg-slate-900 shadow-2xl',
                'overflow-y-auto',
                side === 'left' ? 'left-0 rounded-r-2xl rounded-l-none' : 'right-0 rounded-l-2xl rounded-r-none',
                widthClasses[width]
              )}
              role="dialog"
              aria-modal="true"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 rounded-lg p-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-400 transition-colors"
                aria-label="Close drawer"
              >
                <X size={20} />
              </button>
              <div className="p-6 pt-14">
                {children}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }
);

Drawer.displayName = 'Drawer';
export default Drawer;
