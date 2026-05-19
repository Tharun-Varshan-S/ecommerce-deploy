import { motion } from 'framer-motion';
import clsx from 'clsx';
import Avatar from '../ui/Avatar';

/**
 * TestimonialCard Component - Customer testimonial with avatar, quote, and rating
 * @param {object} testimonial - Testimonial data: { author, role, quote, rating, avatar }
 */
const TestimonialCard = ({ testimonial }) => {
  const {
    author = 'John Doe',
    role = 'Verified Customer',
    quote = 'Great product and excellent service!',
    rating = 5,
    avatar = '',
  } = testimonial;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={clsx(
        'p-6 rounded-2xl',
        'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700',
        'shadow-md hover:shadow-xl transition-all'
      )}
    >
      <div className="flex items-start mb-4">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={i < rating ? 'text-amber-400' : 'text-slate-300 dark:text-slate-600'}
          >
            ★
          </span>
        ))}
      </div>

      <blockquote className="text-slate-700 dark:text-slate-300 text-base leading-relaxed mb-6 italic">
        "{quote}"
      </blockquote>

      <div className="flex items-center gap-3">
        <Avatar src={avatar} initials={author.charAt(0)} size="md" />
        <div>
          <p className="font-semibold text-slate-900 dark:text-white">
            {author}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {role}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
