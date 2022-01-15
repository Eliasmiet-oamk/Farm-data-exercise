import React, { useEffect, useState, lazy, Suspense } from "react";
import NameFilter from "./components/NameFilter";
import axios from "axios";
import "./App.css";

function App() {
  const ListStat = lazy(() => import("./components/ListStat"));
  const List = lazy(() => import("./components/List"));
  const Chart = lazy(() => import("./components/Chart"));
  const Graph = lazy(() => import("./components/Graph"));

  const [farmInfo, setfarmInfo] = useState([]);
  const [filteredFarm, setFilteredFarm] = useState([]);
  const [farmStats, setFarmStats] = useState([]);
  const [month, setMonth] = useState("1");
  const [year, setYear] = useState("2021");
  const [sType, setsType] = useState("pH");
  const [farmName, setFarmName] = useState("");
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    fetchFarmData();
    fetchFarmStats();
  }, [month, year, sType]);

  const fetchFarmData = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/farm?year=${year}&month=${month}&sType=${sType}`
      );
      console.log(data);
      setfarmInfo(data);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const fetchFarmStats = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/farmStats?year=${year}&month=${month}&sType=${sType}`
      );
      console.log(data);
      setFarmStats(data);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const filterLocation = () => {
    let filteredFarmName = farmInfo.filter(
      (t: { location: string }) => t.location === farmName
    );
    setFilteredFarm(filteredFarmName);
  };
  const filteredInfo = filteredFarm.length > 0 ? filteredFarm : farmInfo;

  const renderLoader = () => <p className="center">Loading</p>;

  return (
    <Suspense fallback={renderLoader()}>
      <div>
        <header>
          <button onClick={() => setToggle(!toggle)}>Toggle Chart/Table</button>
          <button onClick={filterLocation}> Search by Farm</button>
          <NameFilter FarmData={farmInfo} stateProp={setFarmName} />
          <button onClick={() => setFilteredFarm([])}>x</button>
          <select onChange={(e: any) => setMonth(e.target.value)}>
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
          <select onChange={(e: any) => setYear(e.target.value)}>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
          </select>
          <select onChange={(e: any) => setsType(e.target.value)}>
            <option value="pH">pH</option>
            <option value="rainFall">rainFall</option>
            <option value="temperature">temperature</option>
          </select>
        </header>
        <div className="row">
          {!toggle ? (
            <List FarmData={filteredInfo} />
          ) : (
            <Chart FarmData={filteredInfo} />
          )}
        </div>
        <div className="row">
          {!toggle ? (
            <ListStat FarmData={farmStats} />
          ) : (
            <Graph FarmData={farmStats} />
          )}
        </div>
      </div>
    </Suspense>
  );
}

export default App;
