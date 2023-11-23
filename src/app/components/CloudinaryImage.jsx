'use client'

import { CldImage } from 'next-cloudinary'

export default function CloudinaryImage({ publicId }) {
  return (
    <CldImage
      alt="Description of my image"
      height="600"
      sizes="100vw"
      src={publicId}
      width="960"
    />
  )
}
