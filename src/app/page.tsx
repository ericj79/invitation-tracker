'use client'

import Goals from './goals'
import RecordForm from './record'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <div className="w-full mx-auto">
        <p className="text-center italic">
          ... Inasmuch as ye have done it unto one of the least of these my brethren, ye have done it unto me.” (Matt. 25:40)
        </p>
      </div>
      <div className="z-10 w-full items-center justify-between text-sm flex">
        <div className="left-0 top-0 flex w-full justify-center ">
          <RecordForm ></RecordForm>
        </div>
      </div>

      <div className="w-full flex-auto flex flex-col">
          <Goals></Goals>
      </div>
    </main>
  )
}
