import addData from "@/firebase/firestore/addData";
import { useState } from "react";
import Working from "./working";
import Success from "./success";

export default function RecordForm() {

  const [invitationCount, setInvitationCount] = useState(1); // Declare a state variable...
  const [working, setWorking] = useState(false); // Declare a state variable...
  const [success, setSuccess] = useState(false); // Declare a state variable...

  const handleForm = async () => {

    setWorking(true);
    const { result, error } = await addData(invitationCount)

    if (error) {
      return console.log(error)
    } else {
      setSuccess(true);
      const timeId = setTimeout(() => {
        // After 3 seconds set the show value to false
        setSuccess(false)
      }, 5000);
  
      setInvitationCount(1)
    }
    setWorking(false);
  }
  async function handleSubmit(e: { preventDefault: () => void; }) {
    // Prevent the browser from reloading the page
    e.preventDefault();
    await handleForm();
  }

  return (

    <div className="w-full max-w-md m-4">
      {success  && <Success />}
      {working  && <Working />}
      <form className="bg-white shadow-md rounded px-8 pt-4 pb-4" onSubmit={handleSubmit}>
        <fieldset disabled={working}>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="pt-2 block text-gray-700 font-bold md:text-right" htmlFor="invitations-count">
                Invitations:
              </label>
            </div>
            <div className="flex-1">
              <input value={invitationCount} onChange={e => setInvitationCount(Number(e.target.value))} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="invitations-count" type="number" />
            </div>
            <div className="flex-auto">
              <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Report
              </button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  )
}