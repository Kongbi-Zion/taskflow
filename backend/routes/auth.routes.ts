import { Router } from "express";
import UserController from "../controllers/auth.controller";
import authenticateToken from "../middleware/auth.middleware";
const router = Router();

router.get("/", UserController.getAllUsers);
router.put("/user/update", authenticateToken, UserController.updateUser);
router.post("/signup", UserController.signUp);
router.post("/signin", UserController.signIn);
router.post("/forgot-password", UserController.forgotPassword);
router.post("/reset-password", UserController.resetPassword);

export default router;
