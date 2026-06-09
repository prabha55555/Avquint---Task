const Task = require('../models/Task');

/**
 * @desc    Create a new task
 * @route   POST /api/tasks
 * @access  Private
 */
const createTask = async (req, res, next) => {
  const { title, description, priority, dueDate, status } = req.body;

  try {
    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      status: status || 'pending',
      userId: req.user.id,
    });

    res.status(201).json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all tasks for logged-in user with filter, search, sort & pagination
 * @route   GET /api/tasks
 * @access  Private
 */
const getTasks = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    // Build query
    const query = { userId: req.user.id };

    // Search filter (title or description)
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, 'i');
      query.$or = [
        { title: searchRegex },
        { description: searchRegex }
      ];
    }

    // Status filter
    if (req.query.status && req.query.status !== 'all') {
      query.status = req.query.status;
    }

    // Priority filter
    if (req.query.priority && req.query.priority !== 'all') {
      query.priority = req.query.priority;
    }

    // Sorting options
    let sort = {};
    const sortBy = req.query.sortBy || 'newest';

    if (sortBy === 'newest') {
      sort = { createdAt: -1 };
    } else if (sortBy === 'oldest') {
      sort = { createdAt: 1 };
    } else if (sortBy === 'dueDate') {
      sort = { dueDate: 1 };
    } else if (sortBy === 'priority') {
      // Sorting high -> medium -> low requires custom aggregation or simple alphabetical/mapped values.
      // We will sort using priority in a pre-defined order by using custom fields if needed, 
      // or we can sort by priority string which will sort alphabetically, 
      // but to make it feel premium, we can map priority to weights in code.
      // In mongo, we can do a collation or custom sorting, but sorting by priority in code or sorting high to low:
      // High (H), Medium (M), Low (L) alphabetically is H -> L -> M.
      // Let's sort alphabetically for simplicity in DB query, or sort: { priority: -1 }
      sort = { priority: 1 }; // standard database sort
    }

    // Execute queries
    const totalTasks = await Task.countDocuments(query);
    const tasks = await Task.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalTasks / limit);

    res.status(200).json({
      success: true,
      tasks,
      pagination: {
        totalTasks,
        totalPages,
        currentPage: page,
        limit,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single task
 * @route   GET /api/tasks/:id
 * @access  Private
 */
const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });

    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found or unauthorized access',
      });
    }

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update task details
 * @route   PUT /api/tasks/:id
 * @access  Private
 */
const updateTask = async (req, res, next) => {
  const { title, description, priority, dueDate, status } = req.body;

  try {
    let task = await Task.findOne({ _id: req.params.id, userId: req.user.id });

    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found or unauthorized access',
      });
    }

    // Update fields
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (priority !== undefined) task.priority = priority;
    if (dueDate !== undefined) task.dueDate = dueDate;
    if (status !== undefined) task.status = status;

    await task.save();

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete task
 * @route   DELETE /api/tasks/:id
 * @access  Private
 */
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });

    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found or unauthorized access',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Toggle/Update task status
 * @route   PATCH /api/tasks/:id/status
 * @access  Private
 */
const updateTaskStatus = async (req, res, next) => {
  const { status } = req.body;

  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });

    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found or unauthorized access',
      });
    }

    task.status = status;
    await task.save();

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get task analytics stats for Dashboard
 * @route   GET /api/tasks/stats
 * @access  Private
 */
const getTaskStats = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Get counts
    const totalTasks = await Task.countDocuments({ userId });
    const completedTasks = await Task.countDocuments({ userId, status: 'completed' });
    const pendingTasks = await Task.countDocuments({ userId, status: 'pending' });

    const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // Weekly Productivity Bar Chart data (Completed tasks count in the last 7 days)
    // Build array of past 7 days
    const weeklyProductivity = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const startOfDay = new Date(date.setHours(0, 0, 0, 0));
      const endOfDay = new Date(date.setHours(23, 59, 59, 999));

      const count = await Task.countDocuments({
        userId,
        status: 'completed',
        updatedAt: { $gte: startOfDay, $lte: endOfDay },
      });

      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      weeklyProductivity.push({
        day: dayName,
        completed: count,
      });
    }

    // Pending vs Completed Trend (over past 7 days)
    const pendingVsCompletedTrend = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const endOfDay = new Date(date.setHours(23, 59, 59, 999));

      // Tasks created on or before this day and completed either after this day or currently pending
      const totalCreatedTillDate = await Task.countDocuments({
        userId,
        createdAt: { $lte: endOfDay },
      });

      const completedTillDate = await Task.countDocuments({
        userId,
        status: 'completed',
        updatedAt: { $lte: endOfDay },
        createdAt: { $lte: endOfDay }
      });

      const pendingTillDate = totalCreatedTillDate - completedTillDate;

      const dateLabel = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      pendingVsCompletedTrend.push({
        date: dateLabel,
        completed: completedTillDate,
        pending: pendingTillDate >= 0 ? pendingTillDate : 0,
      });
    }

    res.status(200).json({
      success: true,
      stats: {
        totalTasks,
        completedTasks,
        pendingTasks,
        completionPercentage,
      },
      charts: {
        taskCompletion: [
          { name: 'Completed', value: completedTasks },
          { name: 'Pending', value: pendingTasks },
        ],
        weeklyProductivity,
        pendingVsCompletedTrend,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  updateTaskStatus,
  getTaskStats,
};
