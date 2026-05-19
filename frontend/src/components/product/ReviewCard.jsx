import clsx from 'clsx';
import { ThumbsUp, ThumbsDown, CheckCircle } from 'lucide-react';

/**
 * ReviewCard Component - Product review with rating, verification, and helpful voting
 * @param {object} review - Review data: { author, date, rating, comment, verified, helpful, unhelpful }
 */
const ReviewCard = ({
  review = {
    author: 'John Doe',
    date: '2024-01-15',
    rating: 4,
    comment: 'Great product, highly recommended!',
    verified: true,
    avatar: 'https://via.placeholder.com/40',
    helpful: 0,
    unhelpful: 0,
  },
  onHelpful,
  onUnhelpful,
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} month${months > 1 ? 's' : ''} ago`;
    }
    return date.toLocaleDateString();
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={i < rating ? 'text-amber-400' : 'text-slate-300 dark:text-slate-600'}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-4 transition-all">
      <div className="flex items-start gap-4">
        <img
          src={review.avatar || 'https://via.placeholder.com/40'}
          alt={review.author}
          className="w-10 h-10 rounded-full object-cover"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-slate-900 dark:text-white truncate">
                  {review.author}
                </h4>
                {review.verified && (
                  <div className="flex items-center gap-0.5 text-green-600 dark:text-green-400 whitespace-nowrap">
                    <CheckCircle size={14} />
                    <span className="text-xs font-medium">Verified</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                {formatDate(review.date)}
              </p>
            </div>
          </div>

          <div className="mt-2 flex items-center gap-2">
            {renderStars(review.rating)}
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {review.rating}/5
            </span>
          </div>

          <p className="text-slate-700 dark:text-slate-300 text-sm mt-3 leading-relaxed">
            {review.comment}
          </p>

          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={() => onHelpful?.(review.id)}
              className={clsx(
                'flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors',
                'hover:bg-white dark:hover:bg-slate-700',
                'text-slate-600 dark:text-slate-400'
              )}
              aria-label="Mark as helpful"
            >
              <ThumbsUp size={14} />
              <span className={review.helpful > 0 ? 'text-green-600 dark:text-green-400' : ''}>
                {review.helpful}
              </span>
            </button>

            <button
              onClick={() => onUnhelpful?.(review.id)}
              className={clsx(
                'flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors',
                'hover:bg-white dark:hover:bg-slate-700',
                'text-slate-600 dark:text-slate-400'
              )}
              aria-label="Mark as unhelpful"
            >
              <ThumbsDown size={14} />
              <span className={review.unhelpful > 0 ? 'text-red-600 dark:text-red-400' : ''}>
                {review.unhelpful}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
