const Task = require('../models/taskModel');

//create task controller
exports.createTask = async (req, res) => {
  try {
    let reqBodyTitle = req.body.title;
    let reqBodyDesc = req.body.description;
    let title = reqBodyTitle.trim();
    let desc = reqBodyDesc.trim();

    if (!title || !desc) {
      //throw new Error("Title or description missing");
      return res.status(400).json({
        msg: 'Title or description missing',
      });
    }
    if (title.length < 5 || desc.length < 5) {
      return res.status(400).json({
        status: 'failed',
        message: 'Text must be at least 5 characters long',
      });
    }

    const newTask = await Task.create({
      title: title,
      description: desc,
    });
    res.status(201).json({
      newTask,
    });
  } catch (error) {
    console.log(error);
  }
};

//get tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({
      tasks,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getSingleTask = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({
        msg: 'No task found with that ID',
      });
    }
    res.status(200).json({
      task,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
      runValidators: true,
    });
    if (!updatedTask) {
      return res.status(404).json({
        msg: 'No task found with that ID',
      });
    }
    res.status(200).json({
      updatedTask,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({
        msg: 'No task found with that ID',
      });
    }
    res.status(204).json({
      data: null,
      message: 'Entry successfully deleted!',
    });
  } catch (error) {
    console.log(error);
  }
};
