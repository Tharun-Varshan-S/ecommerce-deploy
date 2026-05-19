import { motion } from 'framer-motion';
import clsx from 'clsx';

/**
 * FeatureCard Component - Icon, title, description with glassmorphism styling
 * @param {ReactNode} icon - Icon element
 * @param {string} title - Feature title
 * @param {string} description - Feature description
 */
const FeatureCard = ({ icon, title, description }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', damping: 15, stiffness: 300 }}
      className={clsx(
        'group relative p-6 rounded-2xl',
        'bg-white/10 dark:bg-white/5 backdrop-blur-xl',
        'border border-white/20 dark:border-white/10',
        'hover:bg-white/20 dark:hover:bg-white/10 transition-all',
        'shadow-lg hover:shadow-2xl'
      )}
    >
      <div
        className={clsx(
          'flex items-center justify-center w-12 h-12 rounded-xl',
          'bg-gradient-to-br from-violet-500 to-indigo-600',
          'text-white mb-4 group-hover:scale-110 transition-transform'
        )}
      >
        {icon}
      </div>

      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
        {title}
      </h3>

      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
        {description}
      </p>

      <div
        className={clsx(
          'absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity',
          'bg-gradient-to-br from-violet-500/10 to-indigo-600/10 pointer-events-none'
        )}
      />
    </motion.div>
  );
};

export default FeatureCard;
