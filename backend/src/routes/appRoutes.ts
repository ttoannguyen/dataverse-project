import { Router } from "express";
import userRouter from "./userRoutes";
import authRoutes from "./authRoutes";
import dataverse from "./dataverse";
import dataverseItem from "./dataverseItem";
const appRouter = Router();

appRouter.use("/users", userRouter);
appRouter.use("/auth", authRoutes);
appRouter.use("/dataverse", dataverse);
appRouter.use("/dataverseItem", dataverseItem);
export default appRouter;
