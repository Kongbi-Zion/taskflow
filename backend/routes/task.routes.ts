import express from "express";
import TaskController from "../controllers/task.controller";
import authenticateToken from "../middleware/auth.middleware";

const router = express.Router();

// Route to get all tasks for a user
router.get("/:userId", TaskController.getUserTasks);

// Route to get tasks due today for a user
router.get("/today/:userId", TaskController.getUsersTasksToday);

// Route to get tasks due tomorrow for a user
router.get("/tomorrow/:userId", TaskController.getUsersTasksTomorrow);

// Route to get upcoming tasks (tasks due after tomorrow) for a user
router.get("/upcoming/:userId", TaskController.getUsersUpcomingTasks);

// Route to get tasks for a specific project
router.get("/project/:projectId", TaskController.getTasksByProject);

// Route to create a new task
router.post("/create", authenticateToken, TaskController.createTask);

// Route to update an existing task
router.put("/:id", TaskController.updateTask);

// Route to delete a task
router.delete("/:id", TaskController.deleteTask);

export default router;
