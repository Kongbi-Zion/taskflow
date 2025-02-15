import { Router } from "express";
import userRoutes from "./auth.routes";
import taskRoutes from "./task.routes";
const router = Router();

router.use("/auth", userRoutes);
router.use("/tasks", taskRoutes);
export default router;
