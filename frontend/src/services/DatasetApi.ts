import type { DatasetInterface } from "@/types/datasetInterface";
import axios from "axios";

const datasetApi = {
  getDataset: async (
    id: string,
    setError: React.Dispatch<React.SetStateAction<string | null>>
  ): Promise<DatasetInterface | null> => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/dataverseItem/getDataset?global_id=${id}`
      );
      return response.data.data;
    } catch (error) {
      console.error("Init failed", error);
      setError("Error");
      return null;
    }
  },
};

export default datasetApi;
