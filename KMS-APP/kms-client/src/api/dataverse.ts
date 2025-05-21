import axios from "axios";

const API_URL = "http://localhost:3000";

export const searchDatasets = async () => {
  const response = await axios.get(`${API_URL}/search`);
  console.log(response);
  return response.data;
};
