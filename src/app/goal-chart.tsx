import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import { useState, useEffect } from "react";
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface GoalProps {
  actualData: number[]
};

export const options = {
  responsive: true,
  maintainAspectRatio: false
};

export default function GoalChart({actualData}: GoalProps) {
  let labels: string[] = [];
  let goalData: number[] = [];
  let endDate = new Date(2023, 11, 31, 23, 59, 59, 999);
  let currentDate = new Date(2023, 9, 1);


  while (currentDate <= endDate) {
    var dateStr = "";
    if (currentDate.getMonth() == 9) dateStr = "Oct ";
    else if (currentDate.getMonth() == 10) dateStr = "Nov ";
    else dateStr = "Dec ";
    dateStr += currentDate.getDate();

    labels.push(dateStr);
    goalData.push(125);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const data = {
    labels: labels,
    datasets: [{
      data: actualData,
      label: "Total Service Hours",
      borderColor: "rgb(59 130 246)",
      backgroundColor: "rgb(59 130 246 / 0.5)",
      fill: false,
      cubicInterpolationMode: "monotone",
    }, {
      data: goalData,
      label: "Goal",
      borderColor: "rgb(94 186 125)",
      backgroundColor: "rgb(94 186 125 / 0.5)",
      fill: false,
      borderDash: [25, 15],
      pointStyle: false,
    }
    ]
  
};

  // @ts-ignore
  return <Line  options={options} data={data} />;
}
