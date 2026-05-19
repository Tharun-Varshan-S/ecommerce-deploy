const QuantitySelector = ({ value, onChange, max = 99 }) => (
  <div className="flex items-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/70">
    <button
      onClick={() => onChange(Math.max(1, value - 1))}
      className="px-3 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
      type="button"
    >
      -
    </button>
    <span className="min-w-10 px-3 text-center text-slate-900 dark:text-white">{value}</span>
    <button
      onClick={() => onChange(Math.min(max, value + 1))}
      className="px-3 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
      type="button"
    >
      +
    </button>
  </div>
);

export default QuantitySelector;
