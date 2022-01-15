import React, { FC } from "react";
import {FarmInfo} from "../interfaces/FarmInterface"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  FarmData: any;
}

const Chart: FC<Props> = ({ FarmData }) => {

  const labels = FarmData.map((infos: FarmInfo) => [
    infos.location,
    infos.datetime,
  ]);

  const options = {
    plugins: {
      title: {
        display: false,
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
        display: false,
      },
      y: {
        stacked: true,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "value",
        data: FarmData.map((info: FarmInfo) => info.value),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y",
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default Chart;
