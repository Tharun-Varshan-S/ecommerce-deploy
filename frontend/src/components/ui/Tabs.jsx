import { useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

/**
 * Tabs Component - Tab headers with underline indicator and smooth animation
 * @param {array} tabs - Array of tab objects: { id, label, content }
 * @param {string} defaultTab - Default active tab id
 * @param {function} onChange - Callback when tab changes
 */
const Tabs = ({ tabs = [], defaultTab, onChange }) => {
  const defaultId = defaultTab || tabs[0]?.id;
  const [activeTab, setActiveTab] = useState(defaultId);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  return (
    <div className="w-full">
      <div
        className="flex gap-1 border-b border-slate-200 dark:border-slate-700 overflow-x-auto"
        role="tablist"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={clsx(
              'relative px-4 py-3 font-medium text-sm transition-colors whitespace-nowrap',
              activeTab === tab.id
                ? 'text-violet-600 dark:text-violet-400'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-300'
            )}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
          >
            {tab.label}

            {activeTab === tab.id && (
              <motion.div
                layoutId="active-tab-underline"
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-600 to-indigo-600"
                initial={false}
              />
            )}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {tabs.map((tab) => (
          <motion.div
            key={tab.id}
            id={`tabpanel-${tab.id}`}
            role="tabpanel"
            hidden={activeTab !== tab.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: activeTab === tab.id ? 1 : 0,
              y: activeTab === tab.id ? 0 : 10,
            }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === tab.id && tab.content}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
