const taskModel = require("../models/task");
const errorMsg = "Internal Server Error";

const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, status, priority } = req.body;

    if (!title || !description || !dueDate) {
      return res.status(404).json({
        msg: "All fileds are required",
      });
    }

    const task = await taskModel.create({
      title,
      description,
      dueDate,
      status,
      priority,
      user: req.user._id,
    });

    res.status(200).json({
      msg: "task is created successfuly",
      task: task,
    });
  } catch (error) {
    console.log(error, errorMsg);
    res.status(404).json({
      msg: "error",
    });
  }
};

const fetchAllTask = async (req, res) => {
  try {
    const userId = req.user._id;

    const task = await taskModel.find({ user: userId });

    if (!task) {
      return res.status(404).json({
        msg: "your tasks is empty",
        task: []
      });
    }

    res.status(200).json({
      msg: "task fetch successfully",
      task: task,
    });
  } catch (error) {
    console.log(error, errorMsg);
    res.status(404).json({
      msg: "internal server error"
    })
  }
};

const fetchSpecificTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await taskModel.findById({ _id: id, user: req.user._id });

    if (!task) {
      return res.status(404).json({
        msg: "task is not found!",
      });
    }

    res.status(200).json({
      msg: "task fetch successfully",
      task: task,
    });
  } catch (error) {
    console.log(error, errorMsg);
    res.status(404).json({
      msg: "internal server error"
    })
  }
};

const deleteSpecificTask = async (req, res) => {
  try {
    const { id } = req.params;

    const userId = req.user._id;

    if (!userId) {
      return res.status(404).json({
        msg: "user not found",
      });
    }
    const task = await taskModel.findById(id);
    await taskModel.findOneAndDelete(id, task);

    res.status(200).json({
      msg: "task deleted successfully",
      deletedTask: task,
    });
  } catch (error) {
    console.log(error, "error");
    res.status(404).json({
      msg: "internal server error"
    })
  }
};

const fetchTaskByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const userId = req.user._id;
    const tasks = await taskModel.find({ user: userId, status: { $regex: new RegExp(`^${status}$`, 'i') }  });
    if (!tasks) {
      return res.status(404).json({
        msg: "this user task is nothing",
      });
    }

    if (tasks.length === 0) {
      return res.status(200).json({
        msg: "This status task is nothing",
        tasks: []
      });
    }
    res.status(200).json({
      msg: "tasks fetch successfully",
      tasks: tasks,
    });
  } catch (error) {
    console.log(error, "error");
    res.status(404).json({
      msg: "internal server error",
    });
  }
};

const fetchTaskByPriority = async (req, res) => {
  try {
    const { priority } = req.params;
    const userId = req.user._id;
    const tasks = await taskModel.find({ user: userId, priority: { $regex: new RegExp(`^${priority}$`, 'i') }  });
    if (!tasks) {
      return res.status(404).json({
        msg: "this user task is nothing",
      });
    }

    if (tasks.length === 0) {
      return res.status(404).json({
        msg: "this priority of your task is not match",
        tasks: []
      });
    }
    res.status(200).json({
      msg: "tasks fetch successfully",
      tasks: tasks,
    });
  } catch (error) {
    console.log(error, "error");
    res.status(404).json({
      msg: "internal server error",
    });
  }
};

const updateSpecificTask = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;

    if (!update.status) update.status = "Completed";
    if (!update.priority) update.priority = "Medium";
    const updateTask = await taskModel.findByIdAndUpdate(id, update, {
      new: true,
    });

    if (!updateTask) {
      return res.status(404).json({
        msg: "This user tasks is empty",
      });
    }

    res.status(200).json({
      msg: "upadte task successfully🎊",
      task: updateTask,
    });
  } catch (error) {
    console.log(error, "error");
    res.status(404).json({
      msg: "internal server error"
    })
  }
};

module.exports = {
  createTask,
  fetchAllTask,
  fetchSpecificTask,
  deleteSpecificTask,
  fetchTaskByStatus,
  fetchTaskByPriority,
  updateSpecificTask
};
