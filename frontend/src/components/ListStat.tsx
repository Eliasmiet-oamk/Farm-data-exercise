import React, { FC } from "react";
import "../style/ListStyle.css";
interface Props {
  FarmData: any;
}

const ListStat: FC<Props> = ({ FarmData }) => {
  return (
    <table id="list" cellPadding={0} cellSpacing={0}>
      <tbody>
        <tr>
          <th>Location</th>
          <th>Year/Month</th>
          <th>Metric</th>
          <th>average_value</th>
          <th>max_value</th>
          <th>min_value</th>
        </tr>
        {FarmData.map((info: any, idx: number) => (
          <tr key={idx}>
            <td> {info._id.location} </td>
            <td>
              {info._id.year}/{info._id.month}
            </td>
            <td> {info._id.sensorType}</td>
            <td> {info.average_value} </td>
            <td> {info.max_value} </td>
            <td> {info.min_value} </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListStat;
