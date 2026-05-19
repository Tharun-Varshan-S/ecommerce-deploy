import { motion } from 'framer-motion';
import clsx from 'clsx';

/**
 * CategoryCard Component - Category display with image/gradient and product count
 * @param {object} category - Category data: { name, image, productCount, slug }
 */
const CategoryCard = ({ category, onClick }) => {
  const getGradient = (index = 0) => {
    const gradients = [
      'from-violet-500 to-indigo-600',
      'from-blue-500 to-cyan-600',
      'from-emerald-500 to-teal-600',
      'from-orange-500 to-red-600',
      'from-pink-500 to-rose-600',
      'from-amber-500 to-orange-600',
    ];
    return gradients[index % gradients.length];
  };

  const handleClick = () => {
    onClick?.(category);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className="cursor-pointer"
    >
      <div
        className={clsx(
          'relative overflow-hidden rounded-xl h-40 group',
          'shadow-md hover:shadow-xl transition-all'
        )}
      >
        {category.image ? (
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div
            className={clsx(
              'w-full h-full bg-gradient-to-br',
              getGradient(category.index || 0)
            )}
          />
        )}

        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center">
          <h3 className="font-bold text-lg line-clamp-2">{category.name}</h3>
          <p className="text-xs mt-1 opacity-90">
            {category.productCount || 0} products
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryCard;
