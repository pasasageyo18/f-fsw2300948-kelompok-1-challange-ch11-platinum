'use client'

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-3xl font-semibold text-indigo-600">Now Loading</div>
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-14 w-14"></div>
    </div>
  )
}
