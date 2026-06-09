import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const TaskContext = createContext(null);

export const TaskProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    completionPercentage: 0,
  });
  const [charts, setCharts] = useState({
    taskCompletion: [],
    weeklyProductivity: [],
    pendingVsCompletedTrend: [],
  });

  const [tasksLoading, setTasksLoading] = useState(false);
  const [statsLoading, setStatsLoading] = useState(false);

  // Filter, search, and pagination state
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [priority, setPriority] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(1);
  const [limit] = useState(8); // Limit of 8 items per page feels premium and fits cards nicely
  const [pagination, setPagination] = useState({
    totalTasks: 0,
    totalPages: 1,
    currentPage: 1,
  });

  // Fetch Tasks list
  const fetchTasks = useCallback(async () => {
    if (!isAuthenticated) return;
    setTasksLoading(true);
    try {
      const response = await api.get('/tasks', {
        params: {
          page,
          limit,
          search,
          status,
          priority,
          sortBy,
        },
      });
      if (response.data.success) {
        setTasks(response.data.tasks);
        setPagination({
          totalTasks: response.data.pagination.totalTasks,
          totalPages: response.data.pagination.totalPages,
          currentPage: response.data.pagination.currentPage,
        });
      }
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      toast.error('Could not load tasks. Please try again.');
    } finally {
      setTasksLoading(false);
    }
  }, [isAuthenticated, page, limit, search, status, priority, sortBy]);

  // Fetch Task Stats
  const fetchStats = useCallback(async () => {
    if (!isAuthenticated) return;
    setStatsLoading(true);
    try {
      const response = await api.get('/tasks/stats');
      if (response.data.success) {
        setStats(response.data.stats);
        setCharts(response.data.charts);
      }
    } catch (error) {
      console.error('Failed to fetch task stats:', error);
    } finally {
      setStatsLoading(false);
    }
  }, [isAuthenticated]);

  // Refresh tasks and stats
  const refreshData = useCallback(() => {
    fetchTasks();
    fetchStats();
  }, [fetchTasks, fetchStats]);

  // Trigger tasks fetching when query filters change
  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
    }
  }, [fetchTasks, isAuthenticated]);

  // Trigger stats fetching when tasks list updates or initially loads
  useEffect(() => {
    if (isAuthenticated) {
      fetchStats();
    }
  }, [fetchStats, isAuthenticated]);

  // Reset filters
  const resetFilters = () => {
    setSearch('');
    setStatus('all');
    setPriority('all');
    setSortBy('newest');
    setPage(1);
  };

  // Create Task
  const createTask = async (taskData) => {
    try {
      const response = await api.post('/tasks', taskData);
      if (response.data.success) {
        toast.success('Task created successfully!');
        refreshData();
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to create task';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Update Task
  const updateTask = async (id, taskData) => {
    try {
      const response = await api.put(`/tasks/${id}`, taskData);
      if (response.data.success) {
        toast.success('Task updated successfully!');
        refreshData();
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to update task';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Delete Task
  const deleteTask = async (id) => {
    try {
      const response = await api.delete(`/tasks/${id}`);
      if (response.data.success) {
        toast.success('Task deleted successfully!');
        refreshData();
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to delete task';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Toggle status
  const toggleTaskStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    try {
      const response = await api.patch(`/tasks/${id}/status`, { status: newStatus });
      if (response.data.success) {
        toast.success(
          newStatus === 'completed'
            ? 'Task completed! Keep up the good work.'
            : 'Task marked as pending'
        );
        refreshData();
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to toggle task status';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  return (
    <TaskContext.Provider
      value={{
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
        refreshData,
        resetFilters,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
