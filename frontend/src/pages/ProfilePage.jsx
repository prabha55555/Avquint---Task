import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import { User, Mail, Calendar, ClipboardList, CheckCircle2, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const ProfilePage = () => {
  const { user } = useAuth();
  const { stats } = useTasks();

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight mb-1">
          Account Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Manage your personal details and view application metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: User details card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800/80 shadow-sm col-span-1 md:col-span-2 space-y-6"
        >
          {/* Avatar representation */}
          <div className="flex flex-col sm:flex-row items-center gap-5 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div className="h-18 w-18 rounded-2xl bg-gradient-to-tr from-primary to-accent text-white font-extrabold text-2xl flex items-center justify-center shadow-lg shadow-primary/20">
              {getInitials(user?.name)}
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-bold text-slate-850 dark:text-slate-100">{user?.name}</h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider mt-0.5">TaskFlow Pro User</p>
            </div>
          </div>

          {/* Details list */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-slate-655 dark:text-slate-300">
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-100 dark:border-slate-700/50">
                <User className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Full Name</span>
                <span className="text-sm font-semibold">{user?.name}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-slate-655 dark:text-slate-300">
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-100 dark:border-slate-700/50">
                <Mail className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Email Address</span>
                <span className="text-sm font-semibold">{user?.email}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-slate-655 dark:text-slate-300">
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-100 dark:border-slate-700/50">
                <Calendar className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Joined Date</span>
                <span className="text-sm font-semibold">{formatDate(user?.createdAt)}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Mini metrics card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800/80 shadow-sm flex flex-col justify-between"
        >
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-6 uppercase tracking-wider">
              Task metrics
            </h4>

            {/* Total */}
            <div className="flex items-center justify-between py-2 border-b border-slate-50 dark:border-slate-800/50">
              <div className="flex items-center gap-2 text-slate-550 dark:text-slate-400">
                <ClipboardList className="h-4 w-4 text-blue-500" />
                <span className="text-xs font-semibold">Total Created</span>
              </div>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{stats.totalTasks}</span>
            </div>

            {/* Completed */}
            <div className="flex items-center justify-between py-2 border-b border-slate-50 dark:border-slate-800/50">
              <div className="flex items-center gap-2 text-slate-550 dark:text-slate-400">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span className="text-xs font-semibold">Completed</span>
              </div>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{stats.completedTasks}</span>
            </div>

            {/* Pending */}
            <div className="flex items-center justify-between py-2 border-b border-slate-50 dark:border-slate-800/50">
              <div className="flex items-center gap-2 text-slate-550 dark:text-slate-400">
                <Clock className="h-4 w-4 text-rose-500" />
                <span className="text-xs font-semibold">Pending</span>
              </div>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{stats.pendingTasks}</span>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-primary dark:text-accent">
                {stats.completionPercentage}%
              </span>
              <span className="text-[10px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider">Completion Rate</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full mt-2.5 overflow-hidden">
              <div
                className="h-full bg-primary dark:bg-accent rounded-full transition-all duration-300"
                style={{ width: `${stats.completionPercentage}%` }}
              ></div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
