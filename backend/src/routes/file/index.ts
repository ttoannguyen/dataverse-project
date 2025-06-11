import { Router } from "express";
import { getFile } from "../../controllers/file/file.controller";

const router = Router();

router.get("/getFile", getFile);

export default router;
