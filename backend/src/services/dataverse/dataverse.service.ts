// src/services/dataverse/dataverse.service.ts

import axios from "axios";
import redis from "../../config/regis"; // nơi bạn khởi tạo Redis client
import { DataverseSearchResponse } from "../../types/dataverse";

const BASE = process.env.DATAVERSE_API_BASE || "https://demo.dataverse.org/api";

export const fetchData = async (
  page: number,
  perPage: number,
  q = "*",
  sort?: string,
  order?: string,
  type?: string
): Promise<DataverseSearchResponse> => {
  const start = (page - 1) * perPage;

  const searchParams = new URLSearchParams();
  searchParams.append("q", q);
  searchParams.append("start", start.toString());
  searchParams.append("per_page", perPage.toString());
  if (type) searchParams.append("type", type);
  if (sort) searchParams.append("sort", sort);
  if (order) searchParams.append("order", order);

  const cacheKey = `dataverse:search:${searchParams.toString()}`;
  console.log("key - getdata", cacheKey);
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);

  try {
    const response = await axios.get(
      `${BASE}/search?${searchParams.toString()}`
    );
    console.log("service", `${BASE}/search?${searchParams.toString()}`);
    if (response.status === 200 && response.data?.data?.items?.length > 0) {
      console.log("store getdata key", cacheKey);
      await redis.set(cacheKey, JSON.stringify(response.data), "EX", 300); // cache 5 phút
    }

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      throw {
        status: error.response.status,
        message: error.response.data?.message || "Dataverse API error",
        requestUrl: error.response.data?.requestUrl,
      };
    }

    throw {
      status: 500,
      message: "Internal server error while calling Dataverse",
    };
  }
};

export const fetchCounts = async () => {
  const cacheKey = `counts:summary`;
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);

  const [dataverses, datasets, files, root] = await Promise.all([
    axios.get(`${BASE}/search?q=*&type=dataverse`),
    axios.get(`${BASE}/search?q=*&type=dataset`),
    axios.get(`${BASE}/search?q=*&type=file`),
    axios.get(`${BASE}/dataverses/root?returnChildCount=true`),
  ]);

  const result = {
    totalDataverses: dataverses.data.data.total_count,
    totalDatasets: datasets.data.data.total_count,
    totalFiles: files.data.data.total_count,
    rootDataverse: root.data.data.childCount,
  };

  await redis.set(cacheKey, JSON.stringify(result), "EX", 60);
  return result;
};
