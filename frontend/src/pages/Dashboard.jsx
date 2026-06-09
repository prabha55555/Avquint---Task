import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import StatsCard from '../components/StatsCard';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import Pagination from '../components/Pagination';
import EmptyState from '../components/EmptyState';
import Skeleton from '../components/Skeleton';
import {
  CompletionPieChart,
  WeeklyProductivityChart,
  PendingVsCompletedTrendChart,
} from '../components/Charts';
import { ListTodo, CheckCheck, Clock, Percent, Plus, BarChart2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
  const { user } = useAuth();
  const {
    tasks,
    stats,
    charts,
    tasksLoading,
    statsLoading,
    search,
    setSearch,
    status,
    setStatus,
    priority,
    setPriority,
    sortBy,
    setSortBy,
    page,
    setPage,
    limit,
    pagination,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    resetFilters,
  } = useTasks();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [showAnalytics, setShowAnalytics] = useState(true);

  const handleOpenAddModal = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleTaskSubmit = async (taskData) => {
    if (editingTask) {
      await updateTask(editingTask._id, taskData);
    } else {
      await createTask(taskData);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Banner section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight leading-none mb-1.5">
            Welcome back, {user?.name.split(' ')[0]}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Here's an overview of your productivity workspace.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAnalytics(!showAnalytics)}
            className="btn-premium-secondary py-2.5 text-xs font-semibold"
          >
            <BarChart2 className="h-4 w-4" /> {showAnalytics ? 'Hide Charts' : 'Show Charts'}
          </button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleOpenAddModal}
            className="btn-premium-primary py-2.5 text-xs font-semibold shadow-md"
          >
            <Plus className="h-4.5 w-4.5" /> Add Task
          </motion.button>
        </div>
      </div>

      {/* Stats Cards Section */}
      {statsLoading ? (
        <Skeleton.Stats />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatsCard
            title="Total Tasks"
            value={stats.totalTasks}
            icon={ListTodo}
            color="blue"
          />
          <StatsCard
            title="Completed Tasks"
            value={stats.completedTasks}
            icon={CheckCheck}
            color="emerald"
          />
          <StatsCard
            title="Pending Tasks"
            value={stats.pendingTasks}
            icon={Clock}
            color="rose"
          />
          <StatsCard
            title="Completion"
            value={stats.completionPercentage}
            suffix="%"
            icon={Percent}
            color="cyan"
          />
        </div>
      )}

      {/* Recharts Analytics Panel */}
      <AnimatePresence>
        {showAnalytics && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Task Completion Pie */}
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4 uppercase tracking-wider">
                  Task Completion Ratio
                </h3>
                {statsLoading ? <Skeleton.Chart /> : <CompletionPieChart data={charts.taskCompletion} />}
              </div>

              {/* Weekly Productivity Bar */}
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4 uppercase tracking-wider">
                  Weekly Productivity (Completed)
                </h3>
                {statsLoading ? <Skeleton.Chart /> : <WeeklyProductivityChart data={charts.weeklyProductivity} />}
              </div>

              {/* Pending vs Completed Area Trend */}
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm col-span-1 lg:col-span-1">
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4 uppercase tracking-wider">
                  Volume Trends
                </h3>
                {statsLoading ? <Skeleton.Chart /> : <PendingVsCompletedTrendChart data={charts.pendingVsCompletedTrend} />}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Task Filters & Control section */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <SearchBar value={search} onChange={setSearch} placeholder="Search tasks by title or description..." />
          <FilterPanel
            status={status}
            setStatus={setStatus}
            priority={priority}
            setPriority={setPriority}
            sortBy={sortBy}
            setSortBy={setSortBy}
            onReset={resetFilters}
          />
        </div>
      </div>

      {/* Tasks Grid List */}
      <div>
        {tasksLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[...Array(limit)].map((_, i) => (
              <Skeleton.Card key={i} />
            ))}
          </div>
        ) : tasks.length === 0 ? (
          <EmptyState
            type={search || status !== 'all' || priority !== 'all' ? 'search' : 'tasks'}
            onAction={
              search || status !== 'all' || priority !== 'all' ? resetFilters : handleOpenAddModal
            }
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            <AnimatePresence>
              {tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onToggleStatus={toggleTaskStatus}
                  onEdit={handleOpenEditModal}
                  onDelete={deleteTask}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Bottom Pagination */}
      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={(p) => setPage(p)}
      />

      {/* Add / Edit Task Modal */}
      <TaskModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleTaskSubmit}
        task={editingTask}
      />
    </div>
  );
};

export default Dashboard;
