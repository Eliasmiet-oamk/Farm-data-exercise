import React, { FC } from "react";
import { FarmInfo } from "../interfaces/FarmInterface";

interface Props {
  FarmData: any;
  stateProp: any;
}

const NameFilter: FC<Props> = ({ FarmData, stateProp }) => {
  const uniqueFarms: { location: FarmInfo }[] = [];
  FarmData.map((item: { location: FarmInfo }) => {
    var findItem = uniqueFarms.find(
      (x: { location: FarmInfo }) => x.location === item.location
    );
    if (!findItem) uniqueFarms.push(item);
  });

  return (
    <select onChange={(e: any) => stateProp(e.target.value)}>
      <option>All Farms</option>
      {uniqueFarms.map((info: any, idx: number) => (
        <option key={idx} value={info.location}>
          {info.location}
        </option>
      ))}
    </select>
  );
};

export default NameFilter;
