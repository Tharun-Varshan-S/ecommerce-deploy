import { motion } from 'framer-motion';
import clsx from 'clsx';
import { AlertCircle, CheckCircle, InfoIcon, AlertTriangle } from 'lucide-react';

/**
 * Alert Component - Notification boxes with various types and dismissible option
 * @param {string} type - Alert type: 'info', 'success', 'warning', 'error'
 * @param {string} title - Alert title
 * @param {string} message - Alert message
 * @param {function} onDismiss - Callback when dismissed
 */
const alertConfig = {
  info: {
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-800',
    textColor: 'text-blue-800 dark:text-blue-300',
    icon: InfoIcon,
  },
  success: {
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    borderColor: 'border-green-200 dark:border-green-800',
    textColor: 'text-green-800 dark:text-green-300',
    icon: CheckCircle,
  },
  warning: {
    bgColor: 'bg-amber-50 dark:bg-amber-900/20',
    borderColor: 'border-amber-200 dark:border-amber-800',
    textColor: 'text-amber-800 dark:text-amber-300',
    icon: AlertTriangle,
  },
  error: {
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    borderColor: 'border-red-200 dark:border-red-800',
    textColor: 'text-red-800 dark:text-red-300',
    icon: AlertCircle,
  },
};

const Alert = ({
  type = 'info',
  title,
  message,
  onDismiss,
  dismissible = true,
}) => {
  const config = alertConfig[type] || alertConfig.info;
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={clsx(
        'rounded-lg border p-4',
        config.bgColor,
        config.borderColor,
        'flex gap-3'
      )}
      role="alert"
    >
      <Icon className={clsx('flex-shrink-0 w-5 h-5', config.textColor)} />

      <div className="flex-1 min-w-0">
        {title && (
          <h3 className={clsx('font-semibold text-sm', config.textColor)}>
            {title}
          </h3>
        )}
        {message && (
          <p className={clsx('text-sm mt-1', config.textColor)}>
            {message}
          </p>
        )}
      </div>

      {dismissible && onDismiss && (
        <button
          onClick={onDismiss}
          className={clsx(
            'flex-shrink-0 text-lg leading-none opacity-70 hover:opacity-100 transition-opacity',
            config.textColor
          )}
          aria-label="Close alert"
        >
          ×
        </button>
      )}
    </motion.div>
  );
};

export default Alert;
