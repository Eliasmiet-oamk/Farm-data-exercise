import express, { Express, Request, Response, NextFunction } from "express";
import Farm from "../schemas/farmSchema";

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
    }).sort({datetime : 1});

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
});

farmRoute.get("farmall", async(req: Request, res: Response) => {
  Farm.find().then((farm) => res.json(farm))
})

export default farmRoute;
