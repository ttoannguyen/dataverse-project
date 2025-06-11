import type { DataFileResponse } from "@/types/file";
import axios from "axios";

const fileApi = {
  getFile: async (
    id: string,
    setError: React.Dispatch<React.SetStateAction<string | null>>
  ): Promise<DataFileResponse | null> => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/file/getFile?id=${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Init failed", error);
      setError("Error");
      return null;
    }
  },
};

export default fileApi;
