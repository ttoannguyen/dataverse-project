import { Request, Response } from "express";
import * as dataverseService from "../../services/dataverse/dataverse.service";

// export const getInitData = async (_req: Request, res: Response) => {
//   try {
//     const data = await dataverseService.fetchInitData();
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to load init data" });
//   }
// };

export const getCounts = async (_req: Request, res: Response) => {
  try {
    const counts = await dataverseService.fetchCounts();
    res.json(counts);
  } catch (error) {
    res.status(500).json({ error: "Failed to load counts" });
  }
};

export const getData = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const perPage = parseInt(req.query.per_page as string) || 6;
  const type = req.query.type as string | undefined;
  const q = (req.query.q as string) || "*";
  const sort = req.query.sort as string | undefined;
  const order = req.query.order as string | undefined;
  console.log(req.url);
  try {
    const data = await dataverseService.fetchData(
      page,
      perPage,
      q,
      sort,
      order,
      type
    );
    res.json(data);
  } catch (error: any) {
    console.error("Dataverse error:", error);

    res.status(error.status || 500).json({
      error: true,
      message: error.message || "Unknown error",
      ...(error.requestUrl ? { requestUrl: error.requestUrl } : {}),
    });
  }
};

// export const getDataverses = async (req: Request, res: Response) => {
//   const page = parseInt(req.query.page as string) || 1;
//   const perPage = parseInt(req.query.perPage as string) || 20;
//   const q = (req.query.q as string) || "*";
//   const sort = req.query.sort as string | undefined;
//   const order = req.query.order as string | undefined;

//   try {
//     const data = await dataverseService.fetchDataverse(
//       page,
//       perPage,
//       q,
//       sort,
//       order
//     );
//     res.json(data);
//   } catch (error: any) {
//     console.error("Dataverse error:", error);

//     res.status(error.status || 500).json({
//       error: true,
//       message: error.message || "Unknown error",
//       ...(error.requestUrl ? { requestUrl: error.requestUrl } : {}),
//     });
//   }
// };

// export const getDatasets = async (req: Request, res: Response) => {
//   try {
//     const page = parseInt(req.query.page as string) || 1;
//     const data = await dataverseService.fetchDatasets(page);
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to load datasets" });
//   }
// };

// export const getDatasetById = async (req: Request, res: Response) => {
//   try {
//     const id = req.params.id;
//     const data = await dataverseService.fetchDatasetById(id);
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to load dataset" });
//   }
// };
