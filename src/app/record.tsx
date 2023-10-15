import addData from "@/firebase/firestore/addData";
import { useState } from "react";
import Working from "./working";
import Success from "./success";

export default function RecordForm() {

  const [serviceActs, setServiceActs] = useState(1); // Declare a state variable...
  const [comment, setComment] = useState(''); // Declare a state variable...
  const [working, setWorking] = useState(false); // Declare a state variable...
  const [justServe, setJustServe] = useState(false); // Declare a state variable...
  const [success, setSuccess] = useState(false); // Declare a state variable...

  const handleForm = async () => {

    setWorking(true);
    const { result, error } = await addData(serviceActs, comment, justServe)

    if (error) {
      return console.error(error)
    } else {
      setSuccess(true);
      const timeId = setTimeout(() => {
        // After 3 seconds set the show value to false
        setSuccess(false)
      }, 5000);

      setServiceActs(1)
      setComment('')
    }
    setWorking(false);
  }
  async function handleSubmit(e: { preventDefault: () => void; }) {
    // Prevent the browser from reloading the page
    e.preventDefault();
    await handleForm();
  }

  return (

    <div className="w-full mb-2">
      {success && <Success />}
      {working && <Working />}
      <form className="bg-white shadow-md rounded px-4 pt-4 pb-4" onSubmit={handleSubmit}>
        <fieldset disabled={working}>
          <div className="flex flex-wrap space-x-4 space-y-4 md:space-y-0">
            <div className="flex-auto flex space-x-4">
              <div className="flex-none">
                <label className="pt-2 block text-gray-700 font-bold md:text-right" title="Describe the service provided" htmlFor="comment">
                  Description:
                </label>
              </div>
              <div className="flex-auto">
                <input value={comment} onChange={e => setComment(e.target.value)} title="Describe the service provided" placeholder="Service Description" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="comment" type="text" />
              </div>
              <div className="flex-none">
                <label className="pt-2 block text-gray-700 font-bold md:text-right" title="Did you find this on Just Serve?" htmlFor="just-serve">
                  Just Serve:
                </label>
              </div>
              <div className="flex-none">
                <input checked={justServe} onChange={e => setJustServe(e.target.checked)} title="Did you find this on Just Serve?" className="mt-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" id="just-serve" type="checkbox" />
              </div>
            </div>
            <div className="flex-1 flex space-x-4">
              <div className="flex-none">
                <label className="pt-2 block text-gray-700 font-bold md:text-right" title="How many acts of service you are reporting" htmlFor="service-acts">
                   Service Acts:
                </label>
              </div>
              <div className="flex-none w-20">
                <input value={serviceActs} onChange={e => setServiceActs(Number(e.target.value))} title="How many acts of service you are reporting" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="service-acts" type="number" />
              </div>
              <div className="flex-auto">
                <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                  Record
                </button>
              </div>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  )
}