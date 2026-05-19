// frontend/src/components/ui/ThemeToggle.jsx
// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../../theme/ThemeContext';

const ThemeToggle = () => {
  const { isDark, setIsDark } = useContext(ThemeContext);

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setIsDark(!isDark)}
      className="p-2 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </motion.button>
  );
};

export default ThemeToggle;
