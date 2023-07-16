import { useEffect } from "react"
import getData from "@/firebase/firestore/getData";
import { useState } from "react";
import GoalChart from "./goal-chart";

function Goals() {
  let labels: string[] = [];
  let goalData: number[] = [];
  let endDate = new Date(2023, 8, 30, 23, 59, 59, 999);
  let currentDate = new Date (2023, 6, 1);

  const [totalCount, setTotalCount] = useState(0); // Declare a state variable...
  const [actualData, setActualData] = useState([0]); // Declare a state variable...


  while (currentDate <= endDate){
    var dateStr = "";
    if (currentDate.getMonth() == 6) dateStr = "Jul ";
    else if (currentDate.getMonth() == 7) dateStr = "Aug ";
    else dateStr = "Sep ";
    dateStr += currentDate.getDate();
    
    labels.push(dateStr);
    goalData.push(125);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  let data = {
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
  } 


  useEffect(() => {
    getData(setTotalCount, setActualData);
  }, [])
  return (
    <>
        <div className='flex-none mx-auto'>
          <p className="text-2xl mx-auto">Total Invitations: {totalCount} / 125</p>
        </div>
        <div className='border border-gray-400 rounded-xl flex-auto w-full shadow-xl relative'>
          <GoalChart actualData={actualData} />
        </div>
    </>
  )
}

export default Goals;