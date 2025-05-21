import express from "express";
import axios from "axios";
import cors from "cors";
import test from "./test.json";

const app = express();
app.use(cors());

const DATAVERSE_API = "https://demo.dataverse.org/api";

app.get("/search", async (req, res) => {
  const query = req.query.q || "climate";

  try {
    // res.json(test);
    const response = await axios.get(`${DATAVERSE_API}/search`, {
      params: { q: query },
    });
    res.json(response.data);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: "Không thể lấy dữ liệu từ Dataverse" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server đang chạy tại http://localhost:${PORT}`);
});
