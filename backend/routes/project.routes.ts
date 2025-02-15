import express from "express";
import ProjectController from "../controllers/project.controller";

const router = express.Router();

// Route to create a project
router.post("/", ProjectController.createProject);

// Route to update a project
router.put("/:id", ProjectController.updateProject);

// Route to delete a project
router.delete("/:id", ProjectController.deleteProject);

// Route to get all projects for a user
router.get("/user/:userId", ProjectController.getProjectsByUser);

export default router;
