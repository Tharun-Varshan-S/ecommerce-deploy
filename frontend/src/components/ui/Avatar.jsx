import clsx from 'clsx';

/**
 * Avatar Component - Profile picture with fallback initials
 * @param {string} src - Image URL
 * @param {string} alt - Alt text
 * @param {string} initials - Fallback initials (e.g., 'JD')
 * @param {string} size - Size: 'sm' (32px), 'md' (40px), 'lg' (48px)
 */
const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
};

const Avatar = ({ src, alt = 'Avatar', initials = 'U', size = 'md' }) => {
  const getBgColor = (initial) => {
    const colors = [
      'bg-red-500',
      'bg-amber-500',
      'bg-yellow-500',
      'bg-green-500',
      'bg-blue-500',
      'bg-indigo-500',
      'bg-purple-500',
      'bg-pink-500',
    ];
    const charCode = initial.charCodeAt(0);
    return colors[charCode % colors.length];
  };

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={clsx(
          sizeClasses[size],
          'rounded-full object-cover border-2 border-white dark:border-slate-800 shadow-sm'
        )}
      />
    );
  }

  return (
    <div
      className={clsx(
        sizeClasses[size],
        getBgColor(initials[0]),
        'rounded-full flex items-center justify-center font-semibold text-white shadow-sm'
      )}
      title={alt}
      role="img"
      aria-label={alt}
    >
      {initials.toUpperCase().slice(0, 2)}
    </div>
  );
};

export default Avatar;
