import { forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { X } from 'lucide-react';

/**
 * Modal Component - Backdrop blur, dark overlay, centered card layout with animations
 * @param {boolean} isOpen - Controls modal visibility
 * @param {function} onClose - Callback when modal closes
 * @param {ReactNode} children - Modal content
 * @param {string} title - Modal title
 * @param {string} className - Additional CSS classes
 */
const Modal = forwardRef(({ isOpen, onClose, children, title, className }, ref) => (
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
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className={clsx(
              'rounded-2xl border border-slate-200 dark:border-slate-700',
              'bg-white dark:bg-slate-900 shadow-2xl',
              'overflow-hidden',
              className
            )}
          >
            {title && (
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 px-6 py-4">
                <h2 id="modal-title" className="text-xl font-semibold text-slate-900 dark:text-white">
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  className="rounded-lg p-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-400 transition-colors"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>
            )}
            <div className="p-6">
              {children}
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
));

Modal.displayName = 'Modal';
export default Modal;
