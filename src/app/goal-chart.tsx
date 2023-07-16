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

export const options = {
  responsive: true,
  maintainAspectRatio: false
};

export default function GoalChart({actualData}) {
  let labels: string[] = [];
  let goalData: number[] = [];
  let endDate = new Date(2023, 8, 30, 23, 59, 59, 999);
  let currentDate = new Date(2023, 6, 1);


  while (currentDate <= endDate) {
    var dateStr = "";
    if (currentDate.getMonth() == 6) dateStr = "Jul ";
    else if (currentDate.getMonth() == 7) dateStr = "Aug ";
    else dateStr = "Sep ";
    dateStr += currentDate.getDate();

    labels.push(dateStr);
    goalData.push(125);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const data = {
    labels: labels,
    datasets: [{
      data: actualData,
      label: "Total Invitations",
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

// useEffect(() => {
//   console.log("Actual", actualData)
//     setState({
//     labels: labels,
//     datasets: [{
//       data: actualData,
//       label: "Total Invitations",
//       borderColor: "rgb(59 130 246)",
//       backgroundColor: "rgb(59 130 246 / 0.5)",
//       fill: false,
//       cubicInterpolationMode: "monotone",
//     }, {
//       data: goalData,
//       label: "Goal",
//       borderColor: "rgb(94 186 125)",
//       backgroundColor: "rgb(94 186 125 / 0.5)",
//       fill: false,
//       borderDash: [25, 15],
//       pointStyle: false,
//     }
//     ]
//     })

// }, [actualData]);

  return <Line  options={options} data={data} />;
}