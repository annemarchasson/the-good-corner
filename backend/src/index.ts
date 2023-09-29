import "reflect-metadata";
import express from "express";
import db from "./db";

import categoryRouter from "./routes/categories.route";
import tagRouter from "./routes/tags.route";
import adRouter from "./routes/ads.route";
import cors from "cors";

const app = express();
const port = 4000;

//middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" })); //un seul
// app.use(cors({ origin: ["http://localhost:3000", "", ""] })); //plusieurs
// app.use(cors({ origin: "*" }));//tout le monde



//route
app.use("/categories", categoryRouter);
app.use("/tags", tagRouter);
app.use("/ads", adRouter);


//lancement serveur
app.listen(port, async () => {
  await db.initialize();
  console.log(`Server running on http://localhost:${port}`);
});