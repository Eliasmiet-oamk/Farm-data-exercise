import mongoose, { Schema, model, connect } from "mongoose";

interface Farm {
  location: string;
  datetime: Date;
  sensorType: string;
  value: number;
}

const sensortypes = ["pH", "rainFall", "temperature"];

const farmSchema = new Schema<Farm>({
  location: { type: String, required: true },
  datetime: { type: Date, required: true },
  sensorType: { type: String, enum: sensortypes, required: true },
  value: {
    type: Number,
    required: true,
    validate: {
      validator: function (this: Farm, v: number) {
        if (this.sensorType === "pH") {
          if (v >= 0 && v <= 14) {
            return true;
          }
        } else if (this.sensorType === "rainFall") {
          if (v >= 0 && v <= 500) {
            return true;
          }
        } else if (this.sensorType === "temperature") {
          if (v >= -50 && v <= 100) {
            return true;
          }
        }
        return false;
      },
    },
  },
});

const Farm = model<Farm>("farm", farmSchema);

export default Farm;
