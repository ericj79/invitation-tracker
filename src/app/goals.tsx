import { useEffect } from "react"
import getData from "@/firebase/firestore/getData";
import { useState } from "react";
import GoalChart from "./goal-chart";

function Goals() {
  let labels: string[] = [];
  let goalData: number[] = [];
  let endDate = new Date(2023, 11, 31, 23, 59, 59, 999);
  let currentDate = new Date(2023, 9, 1);

  const [totalCount, setTotalCount] = useState(0); // Declare a state variable...
  const [actualData, setActualData] = useState([0]); // Declare a state variable...


  while (currentDate <= endDate){
    var dateStr = "";
    if (currentDate.getMonth() == 9) dateStr = "Oct ";
    else if (currentDate.getMonth() == 10) dateStr = "Nov ";
    else dateStr = "Dec ";
    dateStr += currentDate.getDate();
    
    labels.push(dateStr);
    goalData.push(2023);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  useEffect(() => {
    getData(setTotalCount, setActualData);
  }, [])
  if (actualData.length === 1) {
    return (
      <>
          <div className='flex-none mx-auto'>
            <p className="text-2xl mx-auto">Loading Data ...</p>
          </div>
      </>
    )
  } else {
    return (
      <>
          <div className='flex-none mx-auto'>
            <p className="text-2xl mx-auto">Total Acts of Service: {totalCount} / 2023</p>
          </div>
          <div className='border border-gray-400 rounded-xl flex-auto w-full shadow-xl relative'>
            <GoalChart actualData={actualData} />
          </div>
      </>
    )
  }
}

export default Goals;