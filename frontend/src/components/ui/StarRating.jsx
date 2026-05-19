import { useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { Star } from 'lucide-react';

/**
 * StarRating Component - Interactive 5-star rating display with half-star support
 * @param {number} rating - Current rating value (0-5)
 * @param {number} maxRating - Maximum rating (default 5)
 * @param {function} onRate - Callback when rating changes (interactive mode)
 * @param {boolean} readonly - Display-only mode without interactivity
 * @param {string} size - Star size: 'sm', 'md', 'lg'
 */
const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

const StarRating = ({
  rating = 0,
  maxRating = 5,
  onRate,
  readonly = true,
  size = 'md',
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (index, half = false) => {
    if (!readonly && onRate) {
      onRate(half ? index + 0.5 : index + 1);
    }
  };

  const handleMouseMove = (index, e) => {
    if (!readonly) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const isHalf = x < rect.width / 2;
      setHoverRating(isHalf ? index + 0.5 : index + 1);
    }
  };

  const currentRating = hoverRating || rating;
  const stars = [];

  for (let i = 0; i < maxRating; i++) {
    const isFilled = currentRating >= i + 1;
    const isHalf = currentRating === i + 0.5;

    stars.push(
      <motion.div
        key={i}
        whileHover={!readonly ? { scale: 1.2 } : undefined}
        className={clsx(
          'relative cursor-pointer transition-transform',
          !readonly && 'hover:scale-110'
        )}
        onClick={() => handleClick(i)}
        onMouseMove={(e) => handleMouseMove(i, e)}
        onMouseLeave={() => setHoverRating(0)}
      >
        <Star
          className={clsx(
            sizeClasses[size],
            'transition-colors',
            isFilled || isHalf ? 'text-amber-400 fill-amber-400' : 'text-slate-300 dark:text-slate-600'
          )}
        />
        {isHalf && (
          <div className="absolute inset-0 overflow-hidden w-1/2 pointer-events-none">
            <Star className={clsx(sizeClasses[size], 'text-amber-400 fill-amber-400')} />
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <div className="flex items-center gap-1">
      {stars}
      {!readonly && (
        <span className="ml-2 text-sm text-slate-600 dark:text-slate-400">
          {hoverRating > 0 ? hoverRating.toFixed(1) : rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default StarRating;
