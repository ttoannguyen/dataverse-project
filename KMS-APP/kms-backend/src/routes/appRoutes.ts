import { Router } from "express";
import userRouter from "./userRoutes";
import authRoutes from "./authRoutes";
import dataverse from "./dataverse";
const appRouter = Router();

appRouter.use("/users", userRouter);
appRouter.use("/auth", authRoutes);
appRouter.use("/dataverse", dataverse);
export default appRouter;
