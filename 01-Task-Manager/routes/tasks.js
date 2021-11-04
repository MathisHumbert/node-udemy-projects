const express = require('express');
const router = express.Router();

const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require('../controllers/tasks');

// get all the tasks
router.get('/', getAllTasks);
// create a new task
router.post('/', createTask);
// get single task
router.get('/:id', getTask);
// update task
router.patch('/:id', updateTask);
// delete task
router.delete('/:id', deleteTask);

module.exports = router;
