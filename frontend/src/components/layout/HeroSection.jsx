import { motion } from 'framer-motion';
import clsx from 'clsx';

/**
 * HeroSection Component - Full-width banner with gradient, title, description, CTA
 * @param {string} title - Hero title
 * @param {string} description - Hero description
 * @param {string} buttonText - CTA button text
 * @param {function} onButtonClick - CTA button callback
 * @param {string} backgroundGradient - Gradient classes
 * @param {string} backgroundImage - Background image URL
 */
const HeroSection = ({
  title = 'Welcome to ShopSphere',
  description = 'Discover amazing products at unbeatable prices',
  buttonText = 'Shop Now',
  onButtonClick,
  backgroundGradient = 'from-violet-600 via-indigo-600 to-blue-600',
  backgroundImage,
}) => {
  return (
    <section
      className={clsx(
        'relative min-h-screen w-full flex items-center justify-center overflow-hidden',
        'bg-gradient-to-br',
        backgroundGradient
      )}
      style={
        backgroundImage ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined
      }
    >
      <div className="absolute inset-0 bg-black/40" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto"
        >
          {description}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onButtonClick}
          className={clsx(
            'px-8 py-4 rounded-2xl font-semibold text-lg transition-all',
            'bg-white text-violet-600 hover:bg-slate-100',
            'shadow-xl hover:shadow-2xl'
          )}
        >
          {buttonText}
        </motion.button>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <motion.div
            className="w-1 h-2 bg-white rounded-full mt-2"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
