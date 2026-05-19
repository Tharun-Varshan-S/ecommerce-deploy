import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * SearchBar Component - Input with search icon, dropdown suggestions, and recent searches
 * @param {function} onSearch - Callback when search is performed
 * @param {string} placeholder - Input placeholder text
 * @param {array} suggestions - Array of suggestion strings
 * @param {function} onSuggestionSelect - Callback when suggestion is selected
 */
const SearchBar = ({
  onSearch,
  placeholder = 'Search products...',
  suggestions = [],
  onSuggestionSelect,
}) => {
  const [value, setValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const searchRef = useRef(null);
  const debounceTimer = useRef(null);

  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  useEffect(() => {
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      if (value.trim()) {
        const filtered = suggestions.filter((s) =>
          s.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredSuggestions(filtered);
      } else {
        setFilteredSuggestions([]);
      }
    }, 300);
  }, [value, suggestions]);

  const handleSearch = (searchValue) => {
    const finalValue = searchValue || value;
    if (finalValue.trim()) {
      onSearch?.(finalValue);
      const updated = [finalValue, ...recentSearches.filter((s) => s !== finalValue)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
    }
    setIsOpen(false);
    setValue('');
  };

  const handleSuggestionClick = (suggestion) => {
    setValue(suggestion);
    onSuggestionSelect?.(suggestion);
    handleSearch(suggestion);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className="relative w-full max-w-lg">
      <div
        className={clsx(
          'flex items-center gap-3 px-4 py-2.5 rounded-xl border-2 transition-colors',
          'bg-white dark:bg-slate-900',
          isOpen
            ? 'border-violet-500 shadow-lg'
            : 'border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500'
        )}
        onClick={() => setIsOpen(true)}
      >
        <Search size={18} className="text-slate-400 dark:text-slate-500 flex-shrink-0" />
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
          placeholder={placeholder}
          className={clsx(
            'flex-1 bg-transparent outline-none text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400'
          )}
          aria-label="Search"
        />
        {value && (
          <button
            onClick={() => setValue('')}
            className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-400 transition-colors"
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (filteredSuggestions.length > 0 || recentSearches.length > 0 || value) && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={clsx(
              'absolute top-full left-0 right-0 mt-2 z-50 rounded-xl border border-slate-200 dark:border-slate-700',
              'bg-white dark:bg-slate-900 shadow-xl overflow-hidden'
            )}
          >
            <div className="max-h-80 overflow-y-auto">
              {filteredSuggestions.length > 0 && (
                <div className="border-b border-slate-200 dark:border-slate-700">
                  <div className="px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    Suggestions
                  </div>
                  {filteredSuggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className={clsx(
                        'w-full text-left px-4 py-2.5 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800',
                        'text-slate-700 dark:text-slate-300 flex items-center gap-3'
                      )}
                    >
                      <Search size={16} className="text-slate-400 flex-shrink-0" />
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              {recentSearches.length > 0 && (
                <div>
                  <div className="px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    Recent Searches
                  </div>
                  {recentSearches.map((search, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestionClick(search)}
                      className={clsx(
                        'w-full text-left px-4 py-2.5 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800',
                        'text-slate-700 dark:text-slate-300 flex items-center justify-between'
                      )}
                    >
                      <span>{search}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setRecentSearches(recentSearches.filter((_, i) => i !== idx));
                        }}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                        aria-label="Remove search"
                      >
                        <X size={14} />
                      </button>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
