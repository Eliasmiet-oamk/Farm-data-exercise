import express, { Express, Request, Response, NextFunction } from "express";
import Farm from "../schemas/farmSchema";

const farmRoute = express.Router();

farmRoute.get("/farm", async (req: Request, res: Response) => {
  Farm.find()
    .sort({ datetime: 1 })
    .then((farm) => res.json(farm));
});

export default farmRoute;
