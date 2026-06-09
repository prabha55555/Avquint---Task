import React from 'react';
import { Calendar, Edit2, Trash2, CheckCircle2, Circle } from 'lucide-react';
import { motion } from 'framer-motion';

const TaskCard = ({ task, onToggleStatus, onEdit, onDelete }) => {
  const isOverdue = new Date(task.dueDate) < new Date() && task.status === 'pending';

  // Priority badge color themes
  const priorityColors = {
    high: 'bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-900/40',
    medium: 'bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900/40',
    low: 'bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900/40',
  };

  // Format date helper
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`relative p-5 rounded-2xl border bg-white dark:bg-slate-800/95 transition-all duration-300 shadow-sm hover:shadow-md ${
        task.status === 'completed'
          ? 'border-slate-100 dark:border-slate-800/80 bg-slate-50/40 dark:bg-slate-800/40 opacity-75'
          : 'border-slate-200/80 dark:border-slate-700/80'
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Toggle Status Checkbox */}
        <button
          onClick={() => onToggleStatus(task._id, task.status)}
          className={`flex-shrink-0 mt-0.5 transition-transform duration-200 active:scale-90 ${
            task.status === 'completed'
              ? 'text-success hover:text-success-dark'
              : 'text-slate-400 hover:text-primary dark:text-slate-500'
          }`}
          aria-label={task.status === 'completed' ? 'Mark as pending' : 'Mark as completed'}
        >
          {task.status === 'completed' ? (
            <CheckCircle2 className="h-5.5 w-5.5 fill-success/10" />
          ) : (
            <Circle className="h-5.5 w-5.5" />
          )}
        </button>

        {/* Task Details */}
        <div className="flex-grow min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${
                priorityColors[task.priority] || priorityColors.medium
              }`}
            >
              {task.priority}
            </span>
          </div>

          <h4
            className={`font-semibold text-slate-800 dark:text-slate-100 truncate mb-1 leading-snug ${
              task.status === 'completed' ? 'line-through text-slate-400 dark:text-slate-500' : ''
            }`}
          >
            {task.title}
          </h4>

          <p
            className={`text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4 ${
              task.status === 'completed' ? 'text-slate-400/80 dark:text-slate-500/80' : ''
            }`}
          >
            {task.description || 'No description provided.'}
          </p>

          <div className="h-px bg-slate-100 dark:bg-slate-700/60 w-full mb-3.5"></div>

          <div className="flex justify-between items-center text-slate-400 dark:text-slate-500 text-xs">
            {/* Due Date */}
            <div
              className={`flex items-center gap-1.5 font-medium ${
                isOverdue ? 'text-rose-500 dark:text-rose-400' : 'text-slate-400 dark:text-slate-500'
              }`}
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>{formatDate(task.dueDate)}</span>
              {isOverdue && <span className="font-bold text-[10px] uppercase tracking-wider bg-rose-50 dark:bg-rose-950/20 px-1.5 py-0.5 rounded border border-rose-100 dark:border-rose-900/30 ml-1">Overdue</span>}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => onEdit(task)}
                className="p-1.5 rounded-lg border border-slate-100 dark:border-slate-750 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-accent hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-200"
                aria-label="Edit Task"
              >
                <Edit2 className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => onDelete(task._id)}
                className="p-1.5 rounded-lg border border-slate-105 dark:border-slate-750 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-rose-500 hover:border-rose-100 dark:hover:border-rose-900/40 transition-all duration-200"
                aria-label="Delete Task"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;
