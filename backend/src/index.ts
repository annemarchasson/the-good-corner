import "reflect-metadata";
import express from "express";
import db from "./db";

import categoryRouter from "./routes/categories_route";
import tagRouter from "./routes/tags_route";
import adRouter from "./routes/ads_route";
const app = express();
const port = 4000;

app.use(express.json());
app.use("/categories", categoryRouter);
app.use("tags", tagRouter);
app.use("ads", adRouter);


app.listen(port, async () => {
  await db.initialize();
  console.log(`Server running on http://localhost:${port}`);
});