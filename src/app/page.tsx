'use client'

import Goals from './goals'
import RecordForm from './record'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <div className="z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex">
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
