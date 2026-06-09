import React from 'react';
import { ClipboardList, RotateCcw, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const EmptyState = ({ message, type = 'tasks', onAction }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center text-center p-10 py-16 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm shadow-sm"
    >
      <div className="p-4 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-400 dark:text-slate-500 mb-4 shadow-inner">
        <ClipboardList className="h-10 w-10 animate-pulse" />
      </div>
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-1">
        {type === 'search' ? 'No matching tasks' : 'No tasks yet'}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-6 leading-relaxed">
        {message ||
          (type === 'search'
            ? "We couldn't find any tasks that match your search filters. Try adjusting your query or filters."
            : "Tasks help organize your projects and boost productivity. Create your first task to get started!")}
      </p>

      {onAction && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onAction}
          className="btn-premium-primary"
        >
          {type === 'search' ? (
            <>
              <RotateCcw className="h-4 w-4" /> Reset Filters
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" /> Add Your First Task
            </>
          )}
        </motion.button>
      )}
    </motion.div>
  );
};

export default EmptyState;
