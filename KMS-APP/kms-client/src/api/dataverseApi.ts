import axios from "axios";
import type { Dataset, DataverseCounts } from "../types/dataset";

const dataverseApi = {
  getCounts: async (): Promise<DataverseCounts> => {
    const response = await axios.get<DataverseCounts>(
      "http://localhost:3000/api/dataverse/init"
    );
    return response.data;
  },
  getDatasets: async (): Promise<Dataset[]> => {
    const response = await axios.get<Dataset[]>(
      "http://localhost:3000/api/dataverse/datasets"
    );
    return response.data;
  },
};

export default dataverseApi;
