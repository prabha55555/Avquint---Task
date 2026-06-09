const express = require('express');
const router = express.Router();
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  updateTaskStatus,
  getTaskStats,
} = require('../controllers/taskController');
const { protect } = require('../middleware/auth');
const {
  createTaskValidator,
  updateTaskValidator,
  updateStatusValidator,
} = require('../validators/task');

// Protect all routes below
router.use(protect);

router.post('/', createTaskValidator, createTask);
router.get('/', getTasks);
router.get('/stats', getTaskStats);
router.get('/:id', getTaskById);
router.put('/:id', updateTaskValidator, updateTask);
router.delete('/:id', deleteTask);
router.patch('/:id/status', updateStatusValidator, updateTaskStatus);

module.exports = router;
