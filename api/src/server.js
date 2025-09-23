/* eslint-disable no-undef */
/* eslint-env node */
import express from "express";
import cors from "cors";
import "dotenv/config";
import sequelize from "./db.js";
import artisansRouter from "./routes/artisans.js";

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(",") ?? true }));

app.get("/api/health", (req, res) => res.json({ ok: true }));
app.use("/api", artisansRouter);

const port = Number(process.env.PORT || 3000);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connected ✅");
    app.listen(port, () => console.log(`API running → http://localhost:${port}`));
  } catch (e) {
    console.error("DB connection failed ❌", e?.message || e);
    process.exit(1);
  }
})();
