import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [farmInfo, setfarmInfo] = useState<any>([]);
  const [month, setMonth] = useState("1");
  const [year, setYear] = useState("2021");
  const [sType, setsType] = useState("pH");
  interface FarmInfo {
    location: string;
    datetime: Date;
    sensorType: string;
    value: number;
  }

  useEffect(() => {
    fetchFarmData();
  }, [month, year]);

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

  return (
    <div>
      <header></header>
      <table cellPadding={5} cellSpacing={5}>
        <tbody>
          <tr>
            <th>Location</th>
            <th>Date</th>
            <th>Metric</th>
            <th>Value</th>
          </tr>
          {farmInfo.map((infos: FarmInfo, idx: number) => (
            <tr key={idx}>
              <td> {infos.location} </td>
              <td> {infos.datetime} </td>
              <td> {infos.sensorType} </td>
              <td> {infos.value} </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
