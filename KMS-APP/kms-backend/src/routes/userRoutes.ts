import { Router } from "express";
import { userController } from "../controllers/UserController";
import { authController } from "../controllers/AuthController";
import { authMiddleware } from "../middleware/authMiddleware";

const userRouter = Router();

// Route để lấy tất cả người dùng (yêu cầu xác thực)
userRouter.get("/", authMiddleware, userController.getUsers);

// Route để lấy người dùng theo ID (yêu cầu xác thực)
userRouter.get("/:id", authMiddleware, userController.getUserById);

userRouter.post("/", userController.registerUser);
userRouter.post("/login", authController.login);

export default userRouter;
