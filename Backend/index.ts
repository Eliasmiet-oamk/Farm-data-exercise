import express, { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose, { Schema, model, connect } from "mongoose";
import helmet from "helmet";
import dotenv from "dotenv";
import farmRoute from "./routes/farmRoutes";

dotenv.config();

const PORT = process.env.PORT || 8000;
const app: Express = express();
app.use(cors());

mongoose.connect(process.env.MONGODB_URL as string)
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.on("open", () => console.log("Connected"));

app.use(helmet());
app.use(express.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "50mb",
    parameterLimit: 50000,
  })
);

app.use("/api/", farmRoute);

app.listen(PORT, () => console.log(`Running on ${PORT}`));

export default app
