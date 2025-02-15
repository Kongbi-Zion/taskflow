import { Request, Response } from "express";
import Task from "../models/task.model";
import mongoose from "mongoose";

class TaskController {
  /**
   * @desc Get tasks for a user
   * @route GET /tasks/:userId
   */
  public static async getUserTasks(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId;

      const tasks = await Task.find({
        $or: [{ userId }, { users: userId }],
      })
        .sort({ dueDate: 1 })
        .select("id title description dueDate users");

      if (!tasks.length) {
        res.status(404).json({ message: "No tasks found for this user" });
        return;
      }

      res.json({ message: "Tasks retrieved successfully", tasks });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving tasks", error });
    }
  }

  /**
   * @desc Get tasks due today for a user
   * @route GET /tasks/today/:userId
   */
  public static async getUsersTasksToday(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const userId = req.params.userId;
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const tasks = await Task.find({
        $or: [{ userId }, { users: userId }],
        dueDate: today,
      })
        .sort({ dueDate: 1 })
        .select("id title description dueDate users");

      res.json({ message: "Today's tasks retrieved successfully", tasks });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving today's tasks", error });
    }
  }

  /**
   * @desc Get tasks due tomorrow for a user
   * @route GET /tasks/tomorrow/:userId
   */
  public static async getUsersTasksTomorrow(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const userId = req.params.userId;
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      const tasks = await Task.find({
        $or: [{ userId }, { users: userId }],
        dueDate: tomorrow,
      })
        .sort({ dueDate: 1 })
        .select("id title description dueDate users");

      res.json({ message: "Tomorrow's tasks retrieved successfully", tasks });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving tomorrow's tasks", error });
    }
  }

  /**
   * @desc Get upcoming tasks
   * @route GET /tasks/upcoming/:userId
   */
  public static async getUsersUpcomingTasks(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const userId = req.params.userId;
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      const tasks = await Task.find({
        $or: [{ userId }, { users: userId }],
        dueDate: { $gt: tomorrow },
      })
        .sort({ dueDate: 1 })
        .select("id title description dueDate users");

      res.json({ message: "Upcoming tasks retrieved successfully", tasks });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving upcoming tasks", error });
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
      const { title, description, projectId, userId, users } = req.body;

      const newTask = new Task({
        title,
        description,
        projectId,
        userId,
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
      const { title, description, users } = req.body;

      const task = await Task.findByIdAndUpdate(
        taskId,
        { $set: { title, description, users } },
        { new: true }
      );

      if (!task) {
        res.status(404).json({ message: "Task not found" });
        return;
      }

      res.json({ message: "Task updated successfully", task });
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
      const taskId = req.params.id;

      const task = await Task.findByIdAndDelete(taskId);
      if (!task) {
        res.status(404).json({ message: "Task not found" });
        return;
      }

      res.json({ message: "Task deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting task", error });
    }
  }
}

export default TaskController;
