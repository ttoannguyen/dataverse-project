const express = require("express");
const axios = require("axios");
const cors = require("cors");
const test = require("./test.json");

// router
const appRouter = require("./routes/app");
const clientDB = require("../utils/clientDB");

const app = express();
app.use(cors());
app.use(express.json());

const DATAVERSE_API = "https://demo.dataverse.org/api";

app.get("/search", async (req: any, res: any) => {
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

app.use("/api", appRouter);

app.listen(PORT, () => {
  console.log(`✅ Server đang chạy tại http://localhost:${PORT}`);
});
