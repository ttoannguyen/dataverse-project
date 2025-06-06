import express, { Router, Request, Response } from "express";
import axios from "axios";

const router: Router = express.Router();
// const DATAVERSE_SERVER_URL = "http://172.18.54.49:8080/";
// Test use havard dataverse
const DATAVERSE_SERVER_URL = "https://dataverse.harvard.edu";

interface SearchResult {
  status: string;
  data: {
    total_count: number;
    items?: Array<{
      name: string;
      type: string;
      global_id: string;
      metadata?: {
        country?: string;
        language?: string;
        format?: string;
        organization?: string;
        topic?: string;
        license?: string;
      };
    }>;
  };
}

interface ChildCountResult {
  status: string;
  data: {
    childCount: {
      dataverses: number;
      datasets: number;
      files: number;
    };
  };
}
router.get("/getDataset", async (_req: Request, res: Response) => {
  const globalId = _req.query.global_id;

  try {
    const datasetResponse = await axios.get(
      `${DATAVERSE_SERVER_URL}/api/datasets/:persistentId/?persistentId=${globalId}`
    );

    res.json({
      data: datasetResponse.data,
    });
  } catch (error) {
    console.error("Error fetching Dataverse data:", error);
    res.status(500).json({ error: "Failed to fetch data from Dataverse" });
  }
});

router.get("/count", async (_req: Request, res: Response) => {
  try {
    const dataverseResponse = await axios.get<SearchResult>(
      `${DATAVERSE_SERVER_URL}/api/search?q=*&type=dataverse`
    );
    const dataverseCount = dataverseResponse.data.data.total_count;

    const datasetResponse = await axios.get<SearchResult>(
      `${DATAVERSE_SERVER_URL}/api/search?q=*&type=dataset`
    );
    const datasetCount = datasetResponse.data.data.total_count;

    const fileResponse = await axios.get<SearchResult>(
      `${DATAVERSE_SERVER_URL}/api/search?q=*&type=file`
    );
    const fileCount = fileResponse.data.data.total_count;

    const rootResponse = await axios.get<ChildCountResult>(
      `${DATAVERSE_SERVER_URL}/api/dataverses/root?returnChildCount=true`
    );
    const rootCounts = rootResponse.data.data.childCount;

    res.json({
      totalDataverses: dataverseCount,
      totalDatasets: datasetCount,
      totalFiles: fileCount,
      rootDataverse: rootCounts,
    });
  } catch (error) {
    console.error("Error fetching Dataverse counts:", error);
    res.status(500).json({ error: "Failed to fetch counts from Dataverse" });
  }
});

router.get("/datasets", async (_req: Request, res: Response) => {
  try {
    const response = await axios.get<SearchResult>(
      `${DATAVERSE_SERVER_URL}/api/search?q=*&type=dataset&per_page=100`
    );
    const datasets = response.data.data.items || [];
    res.json(datasets);
  } catch (error) {
    console.error("Error fetching datasets:", error);
    res.status(500).json({ error: "Failed to fetch datasets from Dataverse" });
  }
});

export default router;
