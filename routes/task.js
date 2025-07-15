const express = require("express");

const verifyUSer = require("../middleware/middleware");
const {
  createTask,
  fetchAllTask,
  fetchSpecificTask,
  deleteSpecificTask,
  fetchTaskByStatus,
  fetchTaskByPriority,
  updateSpecificTask,
} = require("../controllers/task");
const taskRoute = express.Router();

taskRoute.post("/createTask", verifyUSer, createTask);
taskRoute.get("/fetchTask", verifyUSer, fetchAllTask);
taskRoute.get("/fetchSpecificTask/:id", verifyUSer, fetchSpecificTask);
taskRoute.delete("/deleteSpecificTask/:id", verifyUSer, deleteSpecificTask);
taskRoute.get("/fetchTaskByStatus/:status", verifyUSer, fetchTaskByStatus);
taskRoute.get(
  "/fetchTaskByPriority/:priority",
  verifyUSer,
  fetchTaskByPriority
);
taskRoute.post("/updateSpecificTask/:id", verifyUSer, updateSpecificTask);

module.exports = taskRoute;
