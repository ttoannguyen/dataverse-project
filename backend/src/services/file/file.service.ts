import axios from "axios";
import { DataFileResponse } from "../../types/file";

const BASE = process.env.DATAVERSE_API_BASE || "https://demo.dataverse.org/api";

export const fetchData = async (id: string): Promise<DataFileResponse> => {
  const searchParams = new URLSearchParams();

  searchParams.append("id", id.toString());

  try {
    const response = await axios.get(`${BASE}/files/${id}?returnOwners=true`);

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
