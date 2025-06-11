import { Router } from "express";
import userRouter from "./userRoutes";
import authRoutes from "./authRoutes";
import dataverseRouter from "./dataverse";
import dataverseItem from "./dataverseItem";
import fileRouter from "./file/index";
const router = Router();

router.use("/users", userRouter);
router.use("/auth", authRoutes);
router.use("/dataverse", dataverseRouter);
router.use("/dataverseItem", dataverseItem);
router.use("/file", fileRouter);
export default router;
