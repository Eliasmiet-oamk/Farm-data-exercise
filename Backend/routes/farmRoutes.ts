import express, { Express, Request, Response, NextFunction } from "express";
import Farm from "../schemas/farmSchema";
import * as csv from "csvtojson";
import multer from "multer";

const farmRoute = express.Router();

farmRoute.get("/farm", async (req: Request, res: Response) => {
  const sType = req.query.sType as string;
  const month = parseInt(req.query.month as string);
  const year = parseInt(req.query.year as string);
  try {
    const data = await Farm.find({
      $expr: {
        $and: [
          { $eq: [{ $year: "$datetime" }, year] },
          { $eq: [{ $month: "$datetime" }, month] },
          { $eq: ["$sensorType", sType] },
        ],
      },
    }).sort({ datetime: 1 });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
});

farmRoute.get("/farmStats", async (req: Request, res: Response) => {
  const sType = req.query.sType as string;
  const month = parseInt(req.query.month as string);
  const year = parseInt(req.query.year as string);
  try {
    const data = await Farm.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              { $eq: [{ $year: "$datetime" }, year] },
              { $eq: [{ $month: "$datetime" }, month] },
              { $eq: ["$sensorType", sType] },
            ],
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$datetime" },
            month: { $month: "$datetime" },
            sensorType: "$sensorType",
            location: "$location",
          },
          average_value: { $avg: "$value" },
          max_value: { $max: "$value" },
          min_value: { $min: "$value" },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

farmRoute.post(
  "/upload-csv",
  upload.single("csv"),
  async (req: Request, res: Response) => {
    try {
      const farmArray = await csv
        .default()
        .fromString((req as any).file.buffer.toString());

      if (farmArray.length != 0) {
        for (let i = 0; i < farmArray.length; i++) {
          const newFarm = new Farm({
            location: farmArray[i].location,
            datetime: farmArray[i].datetime,
            sensorType: farmArray[i].sensorType,
            value: farmArray[i].value,
          });

          newFarm.save(function (err) {
            if (err) {
              console.log(err);
            }
          });
        }
      }

      res.status(200).send("Uploaded successfully!");
    } catch {
      res.status(500).json({ message: "Error" });
    }
  }
);

export default farmRoute;
