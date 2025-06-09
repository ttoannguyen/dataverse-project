import type { CountData } from "@/types/Dataverse/dataverse";
import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

export const getDataverses = async ({
  q,
  sort,
  order,
  page,
  perPage,
  type,
}: {
  q: string;
  sort: string;
  order: string;
  page: number;
  perPage: number;
  type?: string;
}) => {
  console.log(`${baseURL}/dataverse/getdata`, {
    params: { q, type, sort, order, page, per_page: perPage },
  });
  const res = await axios.get(`${baseURL}/dataverse/getdata`, {
    params: { q, type, sort, order, page, per_page: perPage },
  });
  console.log(res);

  return {
    items: res.data?.data?.items || [],
    total: res.data?.data?.total_count || 0,
  };
};

export const getCountData = async (): Promise<CountData> => {
  const res = await axios.get(`${baseURL}/dataverse/count`);
  return res.data;
};
