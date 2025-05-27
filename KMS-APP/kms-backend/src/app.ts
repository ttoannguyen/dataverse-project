import express from "express";
import cors from "cors";
import morgan from "morgan";
import appRouter from "./routes/appRoutes";
import config from "./config/config";
const APP_API_BASE_URL = config.server.API_BASE_URL;

// APP
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use(APP_API_BASE_URL, appRouter);

export default app;
