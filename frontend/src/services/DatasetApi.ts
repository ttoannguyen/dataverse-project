import type { DatasetInterface } from "@/types/datasetInterface";
import axios from "axios";

const datasetApi = {
  getDataset: async (
    id: string,
    setError: React.Dispatch<React.SetStateAction<string | null>>
  ): Promise<DatasetInterface | null> => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/dataset/getDataset?persistentId=${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Init failed", error);
      setError("Error");
      return null;
    }
  },
  getDownloadCount: async (
    id: number
  ): Promise<{
    id: number;
    downloadCount: number;
  } | null> => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/dataset/getDatasetDownloadCount?id=${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Init failed", error);

      return null;
    }
  },

  getDownloadSize: async (
    id: number,
    versionNumber: number,
    versionMinorNumber: number
  ): Promise<{
    status: string;
    data: {
      message: string;
      storageSize: number;
    };
  } | null> => {
    const version =
      versionNumber.toString() + "." + versionMinorNumber.toString();
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/dataset/getDownloadSize?id=${id}&version=${version}`
      );
      return response.data;
    } catch (error) {
      console.error("Init failed", error);

      return null;
    }
  },
};

export default datasetApi;
