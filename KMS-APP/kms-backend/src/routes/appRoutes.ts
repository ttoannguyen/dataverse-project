import { Router } from "express";
import userRouter from "./userRoutes";

const appRouter = Router();

appRouter.use("/users", userRouter);

export default appRouter;
