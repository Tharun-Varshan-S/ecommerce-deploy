// frontend/src/components/ui/Skeleton.jsx
import clsx from 'clsx';

const Skeleton = ({ className, count = 1 }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className={clsx(
          'bg-slate-200 dark:bg-slate-800 animate-pulse rounded-lg',
          className
        )}
      />
    ))}
  </>
);

export default Skeleton;
