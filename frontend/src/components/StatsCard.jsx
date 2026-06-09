import React from 'react';
import { motion } from 'framer-motion';

const StatsCard = ({ title, value, icon: Icon, color = 'blue', suffix = '' }) => {
  // Theme color maps for premium border & background glows
  const colorMaps = {
    blue: {
      bg: 'bg-blue-50/50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400',
      border: 'border-blue-100 dark:border-blue-900/40',
      glow: 'shadow-blue-500/5',
    },
    cyan: {
      bg: 'bg-cyan-50/50 dark:bg-cyan-950/20 text-cyan-600 dark:text-cyan-400',
      border: 'border-cyan-100 dark:border-cyan-900/40',
      glow: 'shadow-cyan-500/5',
    },
    emerald: {
      bg: 'bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400',
      border: 'border-emerald-100 dark:border-emerald-900/40',
      glow: 'shadow-emerald-500/5',
    },
    rose: {
      bg: 'bg-rose-50/50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400',
      border: 'border-rose-100 dark:border-rose-900/40',
      glow: 'shadow-rose-500/5',
    },
  };

  const scheme = colorMaps[color] || colorMaps.blue;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-100 dark:border-slate-800/80 shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-5 ${scheme.glow}`}
    >
      <div className={`p-3.5 rounded-xl ${scheme.bg} border ${scheme.border} flex items-center justify-center`}>
        <Icon className="h-6 w-6" />
      </div>

      <div className="flex-1">
        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
          {title}
        </span>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
            {value}
          </span>
          {suffix && (
            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              {suffix}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;
