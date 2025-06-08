import axios from "axios";

const datasetApi = {
  getDataset: async (
    id: string,
    setError: (error: boolean) => void
  ): Promise<void> => {
    await axios
      .get(
        `http://localhost:3000/api/v1/dataverseItem/getDataset?global_id=${id}`
      )
      .then((response) => {
        console.log(response.data.data);
        return response.data.data;
      })
      .catch((error) => {
        console.error("Init failed", error);
        setError(true);
      });
  },
};

export default datasetApi;
