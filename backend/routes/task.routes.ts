import express from "express";
import TaskController from "../controllers/task.controller";
import authenticateToken from "../middleware/auth.middleware";

const router = express.Router();

// Route to get all tasks for a user
router.get("/:filter/:userId", authenticateToken, TaskController.getUserTasks);

// Route to get tasks for a specific project
router.get("/project/:projectId", TaskController.getTasksByProject);

// Route to create a new task
router.post("/create", authenticateToken, TaskController.createTask);

// Route to update an existing task
router.put("/:id", authenticateToken, TaskController.updateTask);

// Route to delete a task
router.delete("/:userId/:id", authenticateToken, TaskController.deleteTask);

export default router;
