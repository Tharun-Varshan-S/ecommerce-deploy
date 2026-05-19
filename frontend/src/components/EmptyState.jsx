const EmptyState = ({ title, description }) => (
  <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/70 p-8 text-center shadow-sm">
    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{description}</p>
  </div>
);

export default EmptyState;
