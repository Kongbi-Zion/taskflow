import { Request, Response } from "express";
import Project from "../models/project.model"; // Assuming you have a Mongoose model for Project

class ProjectController {
  /**
   * @desc Create a project
   * @route POST /projects
   */
  public static async createProject(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { title, description, userId, users } = req.body;

      const newProject = new Project({
        title,
        description,
        userId,
        users: users || [], // Optional array of user IDs
      });

      await newProject.save();

      res.status(201).json({
        message: "Project created successfully",
        project: newProject,
      });
    } catch (error) {
      res.status(500).json({ message: "Error creating project", error });
    }
  }

  /**
   * @desc Update a project
   * @route PUT /projects/:id
   */
  public static async updateProject(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const projectId = req.params.id;
      const { title, description, users } = req.body;

      const project = await Project.findById(projectId);
      if (!project) {
        res.status(404).json({ message: "Project not found" });
        return;
      }

      project.title = title || project.title;
      project.description = description || project.description;
      project.users = users || project.users;

      await project.save();

      res.json({ message: "Project updated successfully", project });
    } catch (error) {
      res.status(500).json({ message: "Error updating project", error });
    }
  }

  /**
   * @desc Delete a project
   * @route DELETE /projects/:id
   */
  public static async deleteProject(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const projectId = req.params.id;

      const project = await Project.findById(projectId);
      if (!project) {
        res.status(404).json({ message: "Project not found" });
        return;
      }

      // Use deleteOne instead of remove
      await Project.deleteOne({ _id: projectId });

      res.json({ message: "Project deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting project", error });
    }
  }

  /**
   * @desc Get projects by user
   * @route GET /projects/user/:userId
   */
  public static async getProjectsByUser(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const userId = req.params.userId;

      // Fetch projects where user is either the creator or part of the users array
      const projects = await Project.find({
        $or: [
          { userId }, // Project created by the user
          { users: userId }, // User is in the users array
        ],
      });

      if (projects.length === 0) {
        res.status(404).json({ message: "No projects found for this user" });
        return;
      }

      res.json({ message: "Projects retrieved successfully", projects });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving projects", error });
    }
  }
}

export default ProjectController;
