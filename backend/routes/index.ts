import { Router } from "express";
import userRoutes from "./auth.routes";
import taskRoutes from "./task.routes";
import projectRoutes from "./project.routes";
const router = Router();

router.use("/auth", userRoutes);
router.use("/tasks", taskRoutes);
router.use("/projects", projectRoutes);
export default router;
