/*
 * File: index.ts
 * Path: \src\routes\dataverse
 * Project: kms-backend
 * Created Date: Mon Jun 2025
 * Author: ToanNguyen (Email: nttoan189@gmail.com, GitHub: ttoannguyen)
 * -----
 * Last Modified: Mon Jun 09 2025
 * Modified By: ToanNguyen
 * -----
 */
import {
  getCounts,
  //   getDatasetById,
  //   getDatasets,
  //   getInitData,
} from "../../controllers/dataverse/dataverse.controller";
import { Router } from "express";
// import datasetsRouter from "./datasets";
// import dataverseRouter from "./dataverses";
import { getData } from "../../controllers/dataverse/dataverse.controller";
const router = Router();

// router.use("/init", getInitData); // /dataverse/init
router.use("/count", getCounts); // /dataverse/count

//----------------------
// router.use("/datasets", datasetsRouter); // /dataverse/datasets
// router.use("/datasets/:id", getDatasetById); // data
// router.use("/dataverse", dataverseRouter);
router.use("/getdata", getData); // /dataverse/getData
export default router;
