import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
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

function App() {
  const [farmInfo, setfarmInfo] = useState([]);
  const [month, setMonth] = useState("1");
  const [year, setYear] = useState("2021");
  const [sType, setsType] = useState("pH");
  const [farmName, setFarmName] = useState("");
  const [toggle, setToggle] = useState(false);
  interface FarmInfo {
    location: string;
    datetime: Date;
    sensorType: string;
    value: number;
  }

  useEffect(() => {
    fetchFarmData();
  }, [month, year, sType]);

  const fetchFarmData = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/farm?year=${year}&month=${month}&sType=${sType}`
      );
      console.log(data);
      setfarmInfo(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeMonth = (e: any) => {
    setMonth(e.target.value);
  };

  const handleChangeYear = (e: any) => {
    setYear(e.target.value);
  };

  const handleChangesType = (e: any) => {
    setsType(e.target.value);
  };

  const handleChangeFarmName = (e: any) => {
    setFarmName(e.target.value);
  };
  const handleChangefarmInfo = () => {
    setfarmInfo(result);
  };

  const labels = farmInfo.map((infos: FarmInfo) => [
    infos.location,
    infos.datetime,
  ]);

  const data = {
    labels,
    datasets: [
      {
        label: "value",
        data: farmInfo.map((info: FarmInfo) => info.value),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y",
      },
    ],
  };

  /// finds unique Farm names
  const uniqueFarms: { location: FarmInfo }[] = [];
  farmInfo.map((item: { location: FarmInfo }) => {
    var findItem = uniqueFarms.find(
      (x: { location: FarmInfo }) => x.location === item.location
    );
    if (!findItem) uniqueFarms.push(item);
  });

  // filters Farm names
  let result = farmInfo.filter(
    (t: { location: string }) => t.location === farmName
  );

  return (
    <div>
      <header>
        <button onClick={() => setToggle(!toggle)}>Toggle Chart/Table</button>
        <button onClick={handleChangefarmInfo}>Search by Farm</button>
        <select onChange={handleChangeFarmName}>
          {uniqueFarms.map((info: any, idx: number) => (
            <option key={idx} value={info.location}>
              {info.location}
            </option>
          ))}
        </select>
        <button onClick={fetchFarmData}>x</button>
        <select onChange={handleChangeMonth}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
        </select>
        <select onChange={handleChangeYear}>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
        </select>
        <select onChange={handleChangesType}>
          <option value="pH">pH</option>
          <option value="rainFall">rainFall</option>
          <option value="temperature">temperature</option>
        </select>
      </header>
      {!toggle ? (
        <table cellPadding={5} cellSpacing={5}>
          <tbody>
            <tr>
              <th>Location</th>
              <th>Date</th>
              <th>Metric</th>
              <th>Value</th>
            </tr>
            {farmInfo.map((info: FarmInfo, idx: number) => (
              <tr key={idx}>
                <td> {info.location} </td>
                <td> {info.datetime} </td>
                <td> {info.sensorType} </td>
                <td> {info.value} </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Line data={data} />
      )}
    </div>
  );
}

export default App;
