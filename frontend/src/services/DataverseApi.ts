import axios from "axios";

interface DataverseCounts {
  totalDataverses: number;
  totalDatasets: number;
  totalFiles: number;
  rootDataverse: {
    dataverses: number;
    datasets: number;
    files: number;
  };
}

interface Dataset {
  name: string;
  global_id: string;
  metadata?: {
    country?: string;
    language?: string;
    format?: string;
    organization?: string;
    topic?: string;
    license?: string;
  };
}

const dataverseApi = {
  init: async (): Promise<void> => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/_v1/dataverse/init"
      );
      console.log(response.data);
    } catch (error) {
      console.error("Init failed", error);
    }
  },

  getCounts: async (): Promise<DataverseCounts> => {
    const response = await axios.get<DataverseCounts>(
      "http://localhost:3000/api/_v1/dataverse/count"
    );
    console.log(response.data);
    return response.data;
  },

  getDatasets: async (): Promise<Dataset[]> => {
    const response = await axios.get<Dataset[]>(
      "http://localhost:3000/api/_v1/dataverse/datasets"
    );
    console.log(response.data);
    return response.data;
  },
};

export default dataverseApi;
