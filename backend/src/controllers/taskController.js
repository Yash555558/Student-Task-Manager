const Task = require('../models/Task');
const catchAsync = require('../utils/catchAsync');

exports.createTask = catchAsync(async (req, res) => {
  const task = await Task.create({
    ...req.body,
    userId: req.user._id
  });

  res.status(201).json(task);
});

exports.getTasks = catchAsync(async (req, res) => {
  const { status, sortBy } = req.query;

  let filter = { userId: req.user._id };

  if (status === 'pending') filter.completed = false;
  if (status === 'completed') filter.completed = true;

  let query = Task.find(filter);

  if (sortBy === 'priority') query = query.sort({ priority: 1 });
  if (sortBy === 'dueDate') query = query.sort({ dueDate: 1 });

  const tasks = await query;
  res.json(tasks);
});

exports.getTask = catchAsync(async (req, res) => {
  const task = await Task.findOne({
    _id: req.params.id,
    userId: req.user._id
  });

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  res.json(task);
});

exports.updateTask = catchAsync(async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    req.body,
    { new: true, runValidators: true }
  );

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  res.json(task);
});

exports.deleteTask = catchAsync(async (req, res) => {
  const task = await Task.findOneAndDelete({
    _id: req.params.id,
    userId: req.user._id
  });

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  res.json({ message: 'Task deleted' });
});