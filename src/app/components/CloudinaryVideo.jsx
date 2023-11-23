'use client'

import { CldVideoPlayer } from 'next-cloudinary'
import 'next-cloudinary/dist/cld-video-player.css'

export default function CloudinaryVideo({ publicId }) {
  return <CldVideoPlayer height="350" src={publicId} width="600"/>
}
