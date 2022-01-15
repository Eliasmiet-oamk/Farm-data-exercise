import React, { FC } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  FarmData: any;
}

const Chart: FC<Props> = ({ FarmData }) => {
  const labels = FarmData.map((infos: any) => [
    infos._id.location,
    infos._id.month,
    infos._id.year,
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
        label: "average_value",
        data: FarmData.map((info: any) => info.average_value),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "max_value",
        data: FarmData.map((info: any) => info.max_value),
        backgroundColor: "rgb(75, 192, 192)",
      },
      {
        label: "min_value",
        data: FarmData.map((info: any) => info.min_value),
        backgroundColor: "rgb(255, 99, 132)",
      },
    ],
  };
  return <Bar data={data} options={options} />;
};

export default Chart;
