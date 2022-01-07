import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose, { Schema, model, connect }   from 'mongoose';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 8000;
const app: Express = express();
app.use(cors());

mongoose.connect("mongodb://localhost/solita")
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.on('open', () => console.log('Connected'))

interface Farm{
    location: string;
    datetime: string;
    sensortype: string;
    value: string;
  }

const farmSchema = new Schema<Farm>({
    location: { type: String, required: false },
    datetime: { type: String, required: false },
    sensortype:  { type: String, required: false },
    value:  { type: String, required: false },
  });

  const Farm = model<Farm>('farm', farmSchema);

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/farm', (req: Request, res: Response) => {
    Farm.find().then(farm => res.json(farm));
});


app.listen(PORT, () => console.log(`Running on ${PORT}`));