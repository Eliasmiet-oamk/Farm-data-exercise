import React, { FC } from "react";
import {FarmInfo} from '../interfaces/FarmInterface'
import '../style/ListStyle.css'

interface Props {
  FarmData: any;
}

const List: FC<Props> = ({ FarmData }) => {
  return (
    <table id="list"  cellPadding={5} cellSpacing={5}>
      <tbody>
        <tr>
          <th>Location</th>
          <th>Date</th>
          <th>Metric</th>
          <th>Value</th>
        </tr>
        {FarmData.map((info: FarmInfo, idx: number) => (
          <tr  key={idx}>
            <td title="table"> {info.location} </td>
            <td> {info.datetime} </td>
            <td> {info.sensorType} </td>
            <td> {info.value} </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default List;
