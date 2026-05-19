import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

/**
 * PriceRangeSlider Component - Dual range slider for price filtering
 * @param {number} min - Minimum price
 * @param {number} max - Maximum price
 * @param {number} step - Price step increment
 * @param {function} onChange - Callback when range changes
 */
const PriceRangeSlider = ({
  min = 0,
  max = 1000,
  step = 10,
  onChange,
  minLabel = 'Min',
  maxLabel = 'Max',
}) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minRef = useRef(null);
  const maxRef = useRef(null);
  const rangeRef = useRef(null);

  useEffect(() => {
    if (onChange) {
      onChange({ min: minVal, max: maxVal });
    }
  }, [minVal, maxVal, onChange]);

  const handleMinChange = (e) => {
    const newMin = Math.min(Number(e.target.value), maxVal - step);
    setMinVal(newMin);
  };

  const handleMaxChange = (e) => {
    const newMax = Math.max(Number(e.target.value), minVal + step);
    setMaxVal(newMax);
  };

  const minPercent = ((minVal - min) / (max - min)) * 100;
  const maxPercent = ((maxVal - min) / (max - min)) * 100;

  return (
    <div className="space-y-6">
      <div className="relative pt-8 pb-6">
        <div className="relative h-2 rounded-full bg-slate-200 dark:bg-slate-700">
          <div
            ref={rangeRef}
            className="absolute h-2 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500"
            style={{
              left: `${minPercent}%`,
              right: `${100 - maxPercent}%`,
            }}
          />

          <input
            ref={minRef}
            type="range"
            min={min}
            max={max}
            step={step}
            value={minVal}
            onChange={handleMinChange}
            className="absolute w-full h-2 top-4 pointer-events-none appearance-none bg-transparent cursor-pointer accent-violet-500"
            style={{
              zIndex: minVal > max - (max - min) / 3 ? 5 : 3,
            }}
            aria-label={minLabel}
          />

          <input
            ref={maxRef}
            type="range"
            min={min}
            max={max}
            step={step}
            value={maxVal}
            onChange={handleMaxChange}
            className="absolute w-full h-2 top-4 pointer-events-none appearance-none bg-transparent cursor-pointer accent-violet-500"
            style={{
              zIndex: 4,
            }}
            aria-label={maxLabel}
          />
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            ${minVal.toFixed(0)}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">to</div>
          <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            ${maxVal.toFixed(0)}
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2 uppercase">
            {minLabel}
          </label>
          <input
            type="number"
            min={min}
            max={maxVal - step}
            step={step}
            value={minVal}
            onChange={(e) => setMinVal(Math.min(Number(e.target.value), maxVal - step))}
            className={clsx(
              'w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600',
              'bg-white dark:bg-slate-900 text-slate-900 dark:text-white',
              'focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all'
            )}
            aria-label={minLabel}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2 uppercase">
            {maxLabel}
          </label>
          <input
            type="number"
            min={minVal + step}
            max={max}
            step={step}
            value={maxVal}
            onChange={(e) => setMaxVal(Math.max(Number(e.target.value), minVal + step))}
            className={clsx(
              'w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600',
              'bg-white dark:bg-slate-900 text-slate-900 dark:text-white',
              'focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all'
            )}
            aria-label={maxLabel}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
