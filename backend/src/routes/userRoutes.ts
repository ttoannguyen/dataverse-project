import express from "express";
import { userController } from "../controllers/userController";

const userRouter = express.Router();

// Route để lấy danh sách tất cả người dùng
userRouter.get("/", userController.getUsers);

// Route để lấy thông tin người dùng theo ID
userRouter.get("/:id", userController.getUserById);

userRouter.post("/register", userController.registerUser);

export default userRouter;
