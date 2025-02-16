import { Request, Response } from "express";
import Task from "../models/task.model";
import User from "../models/user.model";

class TaskController {
  /**
   * @desc Get tasks for a user based on filter (all, today, tomorrow, upcoming)
   * @route GET /tasks/:filter/:userId
   */
  public static async getUserTasks(req: Request, res: Response): Promise<void> {
    try {
      const { filter, userId } = req.params;

      let query: any = {
        $or: [{ userId }, { users: userId }],
      };

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      if (filter === "today") {
        query.dueDate = { $gte: today, $lt: tomorrow };
      } else if (filter === "tomorrow") {
        const dayAfterTomorrow = new Date();
        dayAfterTomorrow.setDate(tomorrow.getDate() + 1);
        dayAfterTomorrow.setHours(0, 0, 0, 0);

        query.dueDate = { $gte: tomorrow, $lt: dayAfterTomorrow };
      } else if (filter === "upcoming") {
        query.dueDate = { $gt: tomorrow };
      }

      const tasks = await Task.find(query)
        .sort({ dueDate: 1 })
        .select("id title description dueDate users status");

      if (!tasks.length) {
        res.status(404).json({ message: "No tasks found for this filter" });
        return;
      }

      res.json({ message: "Tasks retrieved successfully", tasks });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving tasks", error });
    }
  }

  /**
   * @desc Get tasks by project
   * @route GET /tasks/project/:projectId
   */
  public static async getTasksByProject(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const projectId = req.params.projectId;

      const tasks = await Task.find({ projectId })
        .sort({ dueDate: 1 })
        .select("id title description dueDate users");

      if (!tasks.length) {
        res.status(404).json({ message: "No tasks found for this project" });
        return;
      }

      res.json({
        message: "Tasks for the project retrieved successfully",
        tasks,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving tasks for the project", error });
    }
  }

  /**
   * @desc Create a task
   * @route POST /tasks
   */
  public static async createTask(req: Request, res: Response): Promise<void> {
    console.log(req.body);
    try {
      const { title, description, projectId, userId, users, dueDate } =
        req.body;

      const newTask = new Task({
        title,
        description,
        projectId,
        userId,
        dueDate,
        status: "to-do",
        users: users || [],
      });

      await newTask.save();

      res
        .status(201)
        .json({ message: "Task created successfully", task: newTask });
    } catch (error) {
      res.status(500).json({ message: "Error creating task", error });
    }
  }

  /**
   * @desc Update a task
   * @route PUT /tasks/:id
   */
  public static async updateTask(req: Request, res: Response): Promise<void> {
    try {
      const taskId = req.params.id;
      const { title, description, users, userId } = req.body;

      // Step 1: Find the task by ID
      const task = await Task.findById(taskId);
      if (!task) {
        res.status(404).json({ message: "Task not found" });
        return;
      }

      // Step 2: Check if the task belongs to the user (assuming userId is stored in the task model)
      if (task.userId.toString() !== userId) {
        res
          .status(403)
          .json({ message: "You are not authorized to update this task" });
        return;
      }

      // Step 3: Optionally, check if the user exists in the database (to ensure valid userId)
      const user = await User.findById(userId);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      // Step 4: Update the task if validation passes
      const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        { $set: { title, description, users } },
        { new: true }
      );

      res.json({ message: "Task updated successfully", task: updatedTask });
    } catch (error) {
      res.status(500).json({ message: "Error updating task", error });
    }
  }

  /**
   * @desc Delete a task
   * @route DELETE /tasks/:id
   */
  public static async deleteTask(req: Request, res: Response): Promise<void> {
    try {
      const { userId, id } = req.params;
      const task = await Task.findById(id);
      if (!task) {
        res.status(404).json({ message: "Task not found" });
        return;
      }

      if (task.userId.toString() !== userId) {
        res.status(403).json({
          message: "Unauthorized: You are not the owner of this task",
        });
        return;
      }

      await task.deleteOne();
      res.json({ message: "Task deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting task", error });
    }
  }
}

export default TaskController;
