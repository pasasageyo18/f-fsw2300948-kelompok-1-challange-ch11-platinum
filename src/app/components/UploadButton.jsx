'use client'
import { CldUploadButton } from 'next-cloudinary'
import { useRouter } from 'next/navigation'

export default function UploadButton() {
  const router = useRouter()

  return (
    <div className="bg-blue-500 px-4 py-2 rounded-md">
      <CldUploadButton
        onUpload={() => {
          setTimeout(() => {
            router.refresh()
          }, 2000)
        }}
        uploadPreset="iuukiptx"
      >
        <div className="flex gap-2">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Upload
        </div>
      </CldUploadButton>
    </div>
  )
}
